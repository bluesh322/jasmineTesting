describe("Servers test (with setup and tear-down)", function() {
  beforeEach(function () {
    // initialization logic
    serverNameInput.value = 'Alice';
  });

  it('should add a new server to allServers on submitServerInfo()', function () {
    submitServerInfo();

    expect(Object.keys(allServers).length).toEqual(1);
    expect(allServers['server' + serverId].serverName).toEqual('Alice');
  });

  it('should not add new server of empty string on submitServerInfo()', () => {
    //for this one test we'll change what happens to input
    serverNameInput.value = '';
    submitServerInfo();

    expect(Object.keys(allServers).length).toEqual(0);
  });

  it('should update the #servertable and calculate average tip', () => {
    submitServerInfo();

    let curTdList = document.querySelectorAll('#serverTable td');
  
    expect(curTdList.length).toEqual(3);
    expect(curTdList[0].innerText).toEqual('Alice');
    expect(curTdList[1].innerText).toEqual('$0.00');
    expect(curTdList[2].innerText).toEqual('X');
  });

  afterEach(function() {
    // teardown logic
    allServers = {};
    serverId = 0;
    updateServerTable();
  });
});
