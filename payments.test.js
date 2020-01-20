
describe("Payments test (with setup and tear-down)", () => {
    beforeEach(() => {
        billAmtInput.value = '10';
        tipAmtInput.value = '2';
    });

    it('should add a curPayment to AllPayments on submitPaymentInfo', () => {
        submitPaymentInfo();

        expect(Object.keys(allPayments).length).toEqual(1);
        expect(allPayments['payment' + paymentId].billAmt).toEqual('10');
        expect(allPayments['payment' + paymentId].tipAmt).toEqual('2');
        expect(allPayments['payment' + paymentId].tipPercent).toEqual(20)
    });

    it('should not add a curPayment to AllPayments with empty input on submitPaymentInfo', () => {
        billAmtInput.value = '';
        tipAmtInput.value = '';
        submitPaymentInfo();

        expect(Object.keys(allPayments).length).toEqual(0);
    });

    it('should create curPayment object on createCurPayment', () => {
        let expectedPayment = {
            billAmt: '10',
            tipAmt: '2',
            tipPercent: 20,
          }

        expect(createCurPayment()).toEqual(expectedPayment);
    });

    it('should not create curPayment object on createCurPayment', () => {
        billAmtInput.value = '';
        tipAmtInput.value = '';
        let curPayment = createCurPayment();
        expect(curPayment).toEqual(undefined);
    });

    it('should create table row and pass to appendTd on appendPaymentTable', () => {
        let curPayment = createCurPayment();
        allPayments['payment1'] = curPayment;

        appendPaymentTable(curPayment);

        let tdList = document.querySelectorAll('#paymentTable td');

        expect(tdList.length).toEqual(4);
        expect(tdList[0].innerText).toEqual('$10')
        expect(tdList[1].innerText).toEqual('$2');
        expect(tdList[2].innerText).toEqual('20%');
        expect(tdList[3].innerText).toEqual('X');
    });

    it('should update summary table for 2 payments on updateSummary', () => {
        let curPayment = createCurPayment();
        let curPayment2 = createCurPayment();
        allPayments['payment1'] = curPayment;
        allPayments['payment2'] = curPayment2;

        appendPaymentTable(curPayment);
        updateSummary();
        appendPaymentTable(curPayment2);
        updateSummary();

        let summaryTds = document.querySelectorAll('#summaryTable td');

        expect(summaryTds[0].innerHTML).toEqual('$20');
        expect(summaryTds[1].innerHTML).toEqual('$4');
        expect(summaryTds[2].innerHTML).toEqual('20%');
    });

    afterEach(() => {
        allPayments = {};
        paymentId = 0;
        paymentTbody.innerHTML = '';
        summaryTds[0].innerHTML = '';
        summaryTds[1].innerHTML = '';
        summaryTds[2].innerHTML = '';
        serverTbody.innerHTML = '';
        billAmtInput.value = '';
        tipAmtInput.value = '';
    });
});