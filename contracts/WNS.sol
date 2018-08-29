pragma solidity 0.4.24;

contract WNS {
    
    struct Handle{

        address handleOwner;//Owner of the handle
        string handleName;//This should be unqiue in nature
        string displayName;//Need not to be unqiue
        string imageLocation;//Can be an URI or IPNS address
        string peerId;//OB peerId

    }
    
    mapping(bytes32=>Handle) handleNameHashVsHandle;//Unique handle hash versus Handle
    
    mapping(address=>bool) public superUsers;//addresses who are allowed to handles on other user's behalf

    event NewHandle(string handle, string peerId, address indexed owner);
    
    event NewDisplayName(string handle, string displayName);
    
    event NewImageLocation(string handle, string imageLocation);
    
    event NewPeerId(string handle, string peerId);
    
    event OwnershipTransferred(string handle, address indexed newOwner);
    
    event HandleRemoved(string handle);

    modifier onlyHandleOwner(string handle){
        require(handleNameHashVsHandle[keccak256(abi.encodePacked(handle))].handleOwner == msg.sender, "Unauthorized access to Handle");
        _;
    }
    
    modifier handleExists(string handle){
        require(handleNameHashVsHandle[keccak256(abi.encodePacked(handle))].handleOwner != address(0), "Handle does not exists");
        _;
    }
    
    modifier handleAvailable(string handle){
        require(handleNameHashVsHandle[keccak256(abi.encodePacked(handle))].handleOwner == address(0), "Handle is already taken");
        _;
    }
    
    modifier nonZeroAddress(address _address){
        require(_address != address(0), "0 address sent");
        _;
    }

    modifier onlySuperUser(){
        require(superUsers[msg.sender], "Not a super user");
        _;
    }
    
    constructor(address[] _superUsers)public {

        for(uint i = 0;i<_superUsers.length;i++){

            superUsers[_superUsers[i]] = true;

        }
    }

    /** 
    * @dev Allows super user to add handle on other user's behalf
    * @param owner The address of the owner
    * @param handle Unique Handle
    * @param _displayName Display name of the entity
    * @param _imageLocation URI or IPNS of the image
    * @param _peerId OB peer id
    */
    function addHandle(address owner, string handle, string _displayName, string _imageLocation, string _peerId)external
     onlySuperUser nonZeroAddress(owner){

        _createHandle(owner, handle, _displayName, _imageLocation, _peerId);
    }

    /** 
    * @dev Method to create new handle
    * @param handle Unique Handle
    * @param _displayName Display name of the entity
    * @param _imageLocation URI or IPNS of the image
    * @param _peerId OB peer id
    */
    function createHandle(string handle, string _displayName, string _imageLocation, string _peerId)external {

        _createHandle(msg.sender, handle, _displayName, _imageLocation, _peerId);
       
    }

    //helper method to add/create new handle in the contract
    function _createHandle(address owner, string handle, string _displayName, string _imageLocation, string _peerId)private
     handleAvailable(handle) {

        require(bytes(handle).length>0, "Empty handle name provided");

        bytes32 handleHash = keccak256(abi.encodePacked(handle));
                
        handleNameHashVsHandle[handleHash] = Handle({
            handleOwner:owner,
            handleName:handle,
            displayName:_displayName,
            imageLocation:_imageLocation,
            peerId:_peerId
        });
                
        emit NewHandle(handle, _peerId, owner);
    }
    
    /** 
    * @dev Transfer handle ownership to new address
    * @param handle Handle whose ownership has to be changed
    * @param newOwner Address of the new owner
    */
    function transferOwnership(string handle, address newOwner)external
     handleExists(handle) onlyHandleOwner(handle) nonZeroAddress(newOwner){
         
        bytes32 handleHash = keccak256(abi.encodePacked(handle));

        require(newOwner != handleNameHashVsHandle[handleHash].handleOwner, "New owner is same as previous owner");
        
        handleNameHashVsHandle[handleHash].handleOwner = newOwner;
        
        emit OwnershipTransferred(handle, newOwner);
        
    }
    
    /** 
    * @dev Method to change display name of the entity
    * @param handle Handle whose display name has to be changed
    * @param newName New Display Name
    */
    function changeDisplayName(string handle, string newName)external handleExists(handle) onlyHandleOwner(handle){
        
        require(bytes(newName).length>0, "Empyt names not allowed");

        handleNameHashVsHandle[keccak256(abi.encodePacked(handle))].displayName = newName;
        
        emit NewDisplayName(handle, newName);
    }
    
    /** 
    * @dev Method to change Location of Image
    * @param handle Handle whose image location has to be changed
    * @param newImageLocation New Image Location
    */
    function changeImageLocation(string handle, string newImageLocation)external handleExists(handle) onlyHandleOwner(handle){
        
        handleNameHashVsHandle[keccak256(abi.encodePacked(handle))].imageLocation = newImageLocation;
        
        emit NewImageLocation(handle, newImageLocation);
    }
    
    /** 
    * @dev Method to extra data
    * @param handle Handle whose extra data has to be changed
    * @param peerId New Peer Id
    */
    function changePeerId(string handle, string peerId)external handleExists(handle) onlyHandleOwner(handle){
        
        handleNameHashVsHandle[keccak256(abi.encodePacked(handle))].peerId = peerId;
        
        emit NewPeerId(handle, peerId);
    }
    
    /** 
    * @dev Method to get handle info about specific handle
    * @param handleName The handle whose info has to be fetched
    */
    function getHandleInfo(string handleName)external
     view returns(address owner, string handle, string displayName, string imageLocation, string peerId){
        
        bytes32 handleBytes = keccak256(abi.encodePacked(handleName));
        
        owner = handleNameHashVsHandle[handleBytes].handleOwner;
        handle = handleNameHashVsHandle[handleBytes].handleName;
        displayName = handleNameHashVsHandle[handleBytes].displayName;
        imageLocation = handleNameHashVsHandle[handleBytes].imageLocation;
        peerId = handleNameHashVsHandle[handleBytes].peerId;
    }

    /**
    * @dev Method to check availability of the handle
    * @param handle Handle whose availability has to be checked
    */
    function isHandleAvailable(string handle)external view returns(bool){
        
        return handleNameHashVsHandle[keccak256(abi.encodePacked(handle))].handleOwner == address(0);
    }
    
    /** 
    * @dev Method to remove handleS
    * @param handle Handle to be removed
    */
    function removeHandle(string handle)external handleExists(handle) onlyHandleOwner(handle){
        
        delete handleNameHashVsHandle[keccak256(abi.encodePacked(handle))];        
        emit HandleRemoved(handle);
    }
}