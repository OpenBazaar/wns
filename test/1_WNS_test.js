var WNS = artifacts.require("WNS");

contract("WNS Contract", function(account){

    var handles = new Array();
    var handleInfos = new Object();

    var noExistingHandle = "Not_exists";

    var superUsers = new Array();

    superUsers[0] = account[9];
    superUsers[1] = account[8];

    before(async()=>{
        this.WNS = await WNS.new(superUsers);
    });

    it("Add new handle", async()=>{

        var handleString = "sameepsi";
        var displayName = "SAMEEP SINGHANIA";
        var imageLocation = "http://sameepsinghania.com/assets/images/sameep.jpg";
        var peerId = "peer01";
        var handleOwner = account[4];

        var txResult = await this.WNS.createHandle(handleString, displayName, imageLocation, peerId, {from:handleOwner});

        var eventName = txResult.logs[0].event;
        var receivedHandleName = txResult.logs[0].args.handle;
        var receivedOwner = txResult.logs[0].args.owner;

        assert.equal(eventName, "NewHandle", "NewHandle must be fired");
        assert.equal(receivedHandleName, handleString, "Recieved handle does not matched the passed one");
        assert.equal(receivedOwner, handleOwner, "Passed and received owners does not match");

        handles.push(handleString);
        handleInfos[handleString] = new Object();

        handleInfos[handleString].displayName = displayName;
        handleInfos[handleString].imageLocation = imageLocation;
        handleInfos[handleString].peerId = peerId;
        handleInfos[handleString].owner = handleOwner;
    });

    it("Add same handle twice", async()=>{
        var handleString = "sameepsi";
        var displayName = "SAMEEP SINGHANIA";
        var imageLocation = "http://sameepsinghania.com/assets/images/sameep.jpg";
        var peerId = "peer01";
        var handleOwner = account[3];

        try{
            await this.WNS.createHandle(handleString, displayName, imageLocation, peerId, {from:handleOwner});
            assert.equal(true, false, "Should not be able to add same handle twice");
    
        } catch(error){
            assert.notInclude(error.toString(), 'AssertionError', error.message);        
        }    

    });
    
    it("Add another handle for address already having a handle", async()=>{
        var handleString = "sameepsinghania";
        var displayName = "SAMEEP SINGHANIA";
        var imageLocation = "http://sameepsinghania.com/assets/images/sameep.jpg";
        var peerId = "peer01";
        var handleOwner = account[4];

        var txResult = await this.WNS.createHandle(handleString, displayName, imageLocation, peerId, {from:handleOwner});

        var eventName = txResult.logs[0].event;
        var receivedHandleName = txResult.logs[0].args.handle;
        var receivedOwner = txResult.logs[0].args.owner;

        assert.equal(eventName, "NewHandle", "NewHandle must be fired");
        assert.equal(receivedHandleName, handleString, "Recieved handle does not matched the passed one");
        assert.equal(receivedOwner, handleOwner, "Passed and received owners does not match");

        handles.push(handleString);
        handleInfos[handleString] = new Object();

        handleInfos[handleString].displayName = displayName;
        handleInfos[handleString].imageLocation = imageLocation;
        handleInfos[handleString].peerId = peerId;
        handleInfos[handleString].owner = handleOwner;
    });

    it("Add another handle for peer already having a handle", async()=>{
        var handleString = "sameepsinghania01";
        var displayName = "SAMEEP SINGHANIA";
        var imageLocation = "http://sameepsinghania.com/assets/images/sameep.jpg";
        var peerId = "peer01";
        var handleOwner = account[5];

        var txResult = await this.WNS.createHandle(handleString, displayName, imageLocation, peerId, {from:handleOwner});

        var eventName = txResult.logs[0].event;
        var receivedHandleName = txResult.logs[0].args.handle;
        var receivedOwner = txResult.logs[0].args.owner;

        assert.equal(eventName, "NewHandle", "NewHandle must be fired");
        assert.equal(receivedHandleName, handleString, "Recieved handle does not matched the passed one");
        assert.equal(receivedOwner, handleOwner, "Passed and received owners does not match");

        handles.push(handleString);
        handleInfos[handleString] = new Object();

        handleInfos[handleString].displayName = displayName;
        handleInfos[handleString].imageLocation = imageLocation;
        handleInfos[handleString].peerId = peerId;
        handleInfos[handleString].owner = handleOwner;
    });

    it("Add empty handle", async()=>{
        var handleString = "";
        var displayName = "SAMEEP SINGHANIA";
        var imageLocation = "http://sameepsinghania.com/assets/images/sameep.jpg";
        var peerId = "peer01";
        var handleOwner = account[3];

        try{
            await this.WNS.createHandle(handleString, displayName, imageLocation, peerId, {from:handleOwner});
            assert.equal(true, false, "Should not be able to add empty handle");
    
        } catch(error){
            assert.notInclude(error.toString(), 'AssertionError', error.message);        
        }    

    });

    it("Add new handle on behalf of user from super user account", async()=>{
        var handleString = "taruGupta";
        var displayName = "TARU GUPTA";
        var imageLocation = "http://sameepsinghania.com/assets/images/sameep.jpg";
        var peerId = "peer78";
        var handleOwner = account[4];

        var txResult = await this.WNS.addHandle(handleOwner, handleString, displayName, imageLocation, peerId, {from:superUsers[0]});

        var eventName = txResult.logs[0].event;
        var receivedHandleName = txResult.logs[0].args.handle;
        var receivedOwner = txResult.logs[0].args.owner;

        assert.equal(eventName, "NewHandle", "NewHandle must be fired");
        assert.equal(receivedHandleName, handleString, "Recieved handle does not matched the passed one");
        assert.equal(receivedOwner, handleOwner, "Passed and received owners does not match");

        handles.push(handleString);
        handleInfos[handleString] = new Object();

        handleInfos[handleString].displayName = displayName;
        handleInfos[handleString].imageLocation = imageLocation;
        handleInfos[handleString].peerId = peerId;
        handleInfos[handleString].owner = handleOwner;
    });

    it("Add new handle on behalf of user from non-super user account", async()=>{
        var handleString = "prateek.singhania";
        var displayName = "Prateek Singhania";
        var imageLocation = "http://sameepsinghania.com/assets/images/sameep.jpg";
        var peerId = "peer56";
        var handleOwner = account[7];

        try{
            await this.WNS.addHandle(handleOwner, handleString, displayName, imageLocation, peerId, {from:account[5]});
            assert.equal(true, false, "Should not be able to add new handle on behalf of user from non-super user account");
    
        } catch(error){
            assert.notInclude(error.toString(), 'AssertionError', error.message);        
        } 

        
    });

    it("Transfer Ownership of handle from owner account", async()=>{
        var handleInfo = handleInfos[handles[0]];

        var newOwner = account[2];

        var txResult = await this.WNS.transferOwnership(handles[0], newOwner, {from: handleInfo.owner});
        
        var eventName = txResult.logs[0].event;
        var receivedHandle = txResult.logs[0].args.handle;
        var recievedOwner = txResult.logs[0].args.newOwner;

        assert.equal(eventName, "OwnershipTransferred", "OwnershipTransferred should be fired");
        assert.equal(receivedHandle, handles[0], "Received and passed handle must pass");
        assert.equal(recievedOwner, newOwner, "Received and passed new owners must match");

        handleInfos[handles[0]].owner = newOwner;

        var handleInfo = await this.WNS.getHandleInfo(handles[0]);

        receivedOwner = handleInfo[0];

        assert.equal(receivedOwner, newOwner, "Rceived owner must match the new owner passed");

    });

    it("Transfer Ownership of handle from non-owner account", async()=> {
        var newOwner = account[3];

        try{
            await this.WNS.transferOwnership(handles[0], newOwner, {from: account[0]});
            assert.equal(true, false, "Should not be able to transfer ownership from non-owner account");
    
        } catch(error){
            assert.notInclude(error.toString(), 'AssertionError', error.message);        
        }    

    });

    it("Transfer Ownership of handle to same owner", async()=>{
        var handleInfo = handleInfos[handles[0]];
        try{


           await this.WNS.transferOwnership(handles[0], handleInfo.owner, {from: handleInfo.owner});
           assert.equal(true, false, "Should not be able to transfer ownership to same owner");
    
        } catch(error){
            assert.notInclude(error.toString(), 'AssertionError', error.message);        
        }   

    });

    it("Transfer ownership to address which already owns a handle", async() => {
        var handleString = "taru.gupta";
        var displayName = "TARU GUPTA";
        var imageLocation = "http://sameepsinghania.com/assets/images/sameep.jpg";
        var peerId = "0x00";
        var handleOwner = account[3];

        await this.WNS.createHandle(handleString, displayName, imageLocation, peerId, {from:handleOwner});

        handles.push(handleString);
        handleInfos[handleString] = new Object();

        handleInfos[handleString].displayName = displayName;
        handleInfos[handleString].imageLocation = imageLocation;
        handleInfos[handleString].peerId = peerId;
        handleInfos[handleString].owner = handleOwner;

        var handleInfo = handleInfos[handles[0]];
        

        var txResult = await this.WNS.transferOwnership(handles[0], handleOwner, {from: handleInfo.owner});
        
        var eventName = txResult.logs[0].event;
        var receivedHandle = txResult.logs[0].args.handle;
        var recievedOwner = txResult.logs[0].args.newOwner;

        assert.equal(eventName, "OwnershipTransferred", "OwnershipTransferred should be fired");
        assert.equal(receivedHandle, handles[0], "Received and passed handle must pass");
        assert.equal(recievedOwner, handleOwner, "Received and passed new owners must match");

        handleInfos[handles[0]].owner = handleOwner;

        var handleInformation = await this.WNS.getHandleInfo(handles[0]);

        receivedOwner = handleInformation[0];

        assert.equal(receivedOwner, handleOwner, "Rceived owner must match the new owner passed");
    });

    it("Transfer Ownership of handle which does not exists", async()=> {
        var newOwner = account[3];

        try{
            await this.WNS.transferOwnership(noExistingHandle, newOwner, {from: account[0]});
            assert.equal(true, false, "Should not be able to transfer ownership of handle which does not exists");
    
        } catch(error){
            assert.notInclude(error.toString(), 'AssertionError', error.message);        
        }    

    });

    it("Transfer Ownership of handle from owner account to zero address", async()=>{

        var handleInfo = handleInfos[handles[0]];

        var newOwner = "0x0000000000000000000000000000000000000000";

        try{
            
            await this.WNS.transferOwnership(handles[0], newOwner, {from: handleInfo.owner});
        
            assert.equal(true, false, "Should not be able to transfer ownership of handle to zero address");
    
        } catch(error){
            assert.notInclude(error.toString(), 'AssertionError', error.message);        
        } 

    });



    it("Change display name of handle from owner account", async()=>{
        var handleInfo = handleInfos[handles[0]];

        var newName = "Prateek Singhania";

        var txResult = await this.WNS.changeDisplayName(handles[0], newName, {from: handleInfo.owner});
        
        var eventName = txResult.logs[0].event;
        var receivedHandle = txResult.logs[0].args.handle;
        var recievedDisplayName = txResult.logs[0].args.displayName;

        assert.equal(eventName, "NewDisplayName", "NewDisplayName should be fired");
        assert.equal(receivedHandle, handles[0], "Received and passed handle must pass");
        assert.equal(recievedDisplayName, newName, "Received and passed display names must match");

        handleInfos[handles[0]].displayName = newName;
        var handleInformation = await this.WNS.getHandleInfo(handles[0]);

        recievedDisplayName = handleInformation[2];

        assert.equal(recievedDisplayName, newName, "Rceived name must match the new name passed");

    });

    it("Change display name of handle from non-owner account", async()=> {
        var newName = "Prateek Singhania";

        try{
            await this.WNS.changeDisplayName(handles[0], newName, {from: account[0]});
            assert.equal(true, false, "Should not be able to change display name of handle from non-owner account");
    
        } catch(error){
            assert.notInclude(error.toString(), 'AssertionError', error.message);        
        }    

    });

 

    it("Change display name of handle which does not exists", async()=> {
        var newName = "Prateek Singhania";

        try{
            await this.WNS.changeDisplayName(noExistingHandle, newName, {from: account[0]});
            assert.equal(true, false, "Should not be able to change display name of handle which does not exists");
    
        } catch(error){
            assert.notInclude(error.toString(), 'AssertionError', error.message);        
        }    

    });

    it("Change display name handle to empty display name", async()=>{

        var handleInfo = handleInfos[handles[0]];

        var newName = "";

        try{
            
            await this.WNS.changeDisplayName(handles[0], newName, {from: handleInfo.owner});
        
            assert.equal(true, false, "Should not be able to change display name handle to empty display name");
    
        } catch(error){
            assert.notInclude(error.toString(), 'AssertionError', error.message);        
        } 

    });


    it("Change location of image for handle from owner account", async()=>{
        var handleInfo = handleInfos[handles[0]];

        var newImageLocation = "https://www.pexels.com/photo/scenic-view-of-beach-248797/";

        var txResult = await this.WNS.changeImageLocation(handles[0], newImageLocation, {from: handleInfo.owner});
        
        var eventName = txResult.logs[0].event;
        var receivedHandle = txResult.logs[0].args.handle;
        var recievedImageLocation = txResult.logs[0].args.imageLocation;

        assert.equal(eventName, "NewImageLocation", "NewImageLocation should be fired");
        assert.equal(receivedHandle, handles[0], "Received and passed handle must pass");
        assert.equal(recievedImageLocation, newImageLocation, "Received and passed image locations must match");

        handleInfos[handles[0]].imageLocation = newImageLocation;

        var handleInformation = await this.WNS.getHandleInfo(handles[0]);

        recievedImageLocation = handleInformation[3];

        assert.equal(recievedImageLocation, newImageLocation, "Rceived image location must match the new image location passed");

    });

    it("Change location of image for handle from non-owner account", async()=> {
        var newImageLocation = "https://www.pexels.com/photo/scenic-view-of-beach-248797/";

        try{
            await this.WNS.changeImageLocation(handles[0], newImageLocation, {from: account[0]});
            assert.equal(true, false, "Should not be able to change location of image for handle from non-owner account");
    
        } catch(error){
            assert.notInclude(error.toString(), 'AssertionError', error.message);        
        }    

    });

 

    it("Change location of image for handle which does not exists", async()=> {
        var newImageLocation = "https://www.pexels.com/photo/scenic-view-of-beach-248797/";

        try{
            await this.WNS.changeImageLocation(noExistingHandle, newImageLocation, {from: account[0]});
            assert.equal(true, false, "Should not be able to change location of image for handle which does not exists");
    
        } catch(error){
            assert.notInclude(error.toString(), 'AssertionError', error.message);        
        }    

    });


    it("Change peerId for handle from owner account", async()=>{
        var handleInfo = handleInfos[handles[0]];

        var newPeerId = "peer90";

        var txResult = await this.WNS.changePeerId(handles[0], newPeerId, {from: handleInfo.owner});
        
        var eventName = txResult.logs[0].event;
        var receivedHandle = txResult.logs[0].args.handle;
        var recievedPeerId = txResult.logs[0].args.peerId;

        assert.equal(eventName, "NewPeerId", "NewPeerId should be fired");
        assert.equal(receivedHandle, handles[0], "Received and passed handle must pass");
        assert.equal(recievedPeerId, newPeerId, "Received and passed peer id must match");

        handleInfos[handles[0]].peerId = newPeerId;

        var handleInformation = await this.WNS.getHandleInfo(handles[0]);

        recievedPeerId = handleInformation[4];

        assert.equal(recievedPeerId, newPeerId, "Rceived peer id must match the new peer id passed");

    });

    it("Change peer id for handle from non-owner account", async()=> {
        var newPeerId = "peer09";

        try{
            await this.WNS.changePeerId(handles[0], newPeerId, {from: account[0]});
            assert.equal(true, false, "Should not be able to change peer id for handle from non-owner account");
    
        } catch(error){
            assert.notInclude(error.toString(), 'AssertionError', error.message);        
        }    

    }); 

    it("Change peer id for handle which does not exists", async()=> {
        var newPeerId = "peer09";

        try{
            await this.WNS.changeExtraData(noExistingHandle, newPeerId, {from: account[0]});
            assert.equal(true, false, "Should not be able to change peer id for handle which does not exists");
    
        } catch(error){
            assert.notInclude(error.toString(), 'AssertionError', error.message);        
        }    
    });

    it("Fetch Handle Info for existing Handle", async()=>{

        for(var i=0; i<handles.length;i++){
            var handleInfo = await this.WNS.getHandleInfo(handles[i]);

            var receivedOwner = handleInfo[0];
            var recievedDisplayName = handleInfo[2];
            var recievedImageLocation = handleInfo[3];
            var recievedPeerId = handleInfo[4];

            assert.equal(receivedOwner, handleInfos[handles[i]].owner, "Received owner must match the saved handle");
            assert.equal(recievedDisplayName, handleInfos[handles[i]].displayName, "Recieved Display name must match the saved display name");
            assert.equal(recievedPeerId, handleInfos[handles[i]].peerId, "Received peer id must match the saved peer id");
            assert.equal(recievedImageLocation, handleInfos[handles[i]].imageLocation, "Received image location must the saved image location");
        }

    });

    it("Fetch Handle Info for non-existing Handle", async()=>{

        for(var i=0; i<handles.length;i++){
            var handleInfo = await this.WNS.getHandleInfo(noExistingHandle);

            var receivedOwner = handleInfo[0];
            var recievedDisplayName = handleInfo[2];
            var recievedImageLocation = handleInfo[3];
            var recievedPeerId = handleInfo[4];

            assert.equal(receivedOwner, "0x0000000000000000000000000000000000000000", "Received owner must match be 0 address");
            assert.equal(recievedDisplayName, "", "Received display name must be empty");
            assert.equal(recievedPeerId, "", "Received peer id must be empty");
            assert.equal(recievedImageLocation, "", "Received image location must be empty");
        }

    });

   

    it("Check availability of non-existing handle", async()=>{

        var availability = await this.WNS.isHandleAvailable(noExistingHandle);

        assert.equal(availability, true, "Non-Existing handle must be available");

    });

    it("Check availability of existing handle", async()=>{

        var availability = await this.WNS.isHandleAvailable(handles[0]);

        assert.equal(availability, false, "Existing handle must not be available");

    });

    it("Remove existing handle from owner account", async()=>{

        var handle = handles.pop();
        var handleInfo = handleInfos[handle];
        var txResult = await this.WNS.removeHandle(handle, {from:handleInfo.owner});

        var eventName = txResult.logs[0].event;
        var receivedHandle = txResult.logs[0].args.handle;

        assert.equal(eventName, "HandleRemoved", "HandleRemoved event must be fired");
        assert.equal(receivedHandle, handle, "Received and passed handle must match");

        delete handleInfos[handle];

        var handleInfo = await this.WNS.getHandleInfo(handle);

        var receivedOwner = handleInfo[0];
        var receivedHandleName = handleInfo[1];

        assert.equal(receivedOwner, "0x0000000000000000000000000000000000000000", "Received owner must be 0 address");
        assert.equal(receivedHandleName, "", "Rceived handle name must be empty string");

        var availability = await this.WNS.isHandleAvailable(handle);

        assert.equal(availability, true, "Handle must be available");

    });

    it("Remove existing handle from non-owner account", async()=>{

        var handle = handles.pop();        
        try{
            await this.WNS.removeHandle(handle, {from:account[0]});
            assert.equal(true, false, "Should not be able to remove handle from non-owner account");
    
        } catch(error){
            assert.notInclude(error.toString(), 'AssertionError', error.message);        
        } 
        

    });

  

});
