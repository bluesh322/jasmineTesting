describe("Helpers test (with setup and tear-down)", () => {
    beforeEach(() => {
        billAmtInput.value = '10';
        tipAmtInput.value = '2';
        submitPaymentInfo();
    });

    it('should sum all tip amounts of all payments on sumPaymentTotal', () => {
        expect(sumPaymentTotal('tipAmt')).toEqual(2);

        billAmtInput.value = '10';
        tipAmtInput.value = '2';
        submitPaymentInfo();
        
        expect(sumPaymentTotal('tipAmt')).toEqual(4);
    });

    it('should sum all bill amounts of all payments on sumPaymentTotal', () => {
        expect(sumPaymentTotal('billAmt')).toEqual(10);

        billAmtInput.value = '10';
        tipAmtInput.value = '2';
        submitPaymentInfo();
        
        expect(sumPaymentTotal('billAmt')).toEqual(20);
    });

    it('should sum all tip percents of all payments on sumPaymentTotal', () => {
        expect(sumPaymentTotal('tipPercent')).toEqual(20);

        billAmtInput.value = '10';
        tipAmtInput.value = '2';
        submitPaymentInfo();
        
        expect(sumPaymentTotal('tipPercent')).toEqual(40);
    });

    it('should calculate tip percent of a tip on calculateTipPercent', () => {
        expect(calculateTipPercent(10, 2)).toEqual(20);
        expect(calculateTipPercent(10, 4)).toEqual(40);
    });

    it('should create new td from row element and value on appendTd', () => {
        let newTr = document.createElement('tr');

        appendTd(newTr, 'test');
        
        expect(newTr.children.length).toEqual(1);
        console.log(newTr.children.innerHTML);
        expect(newTr.firstChild.innerHTML).toEqual('test')
    });

    it('should create delete td with value X and click listener on appendDeleteBtn', () => {
        let newTr = document.createElement('tr');
        appendDeleteBtn(newTr);
        
        expect(newTr.children.length).toEqual(1);
        expect(newTr.firstChild.innerHTML).toEqual('X');
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