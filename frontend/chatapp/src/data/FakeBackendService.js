class FakeBackendService {

    constructor() {
        //this.baseUrl = "http://localhost:8080/ws4/rest/authors/"; //ws4,ws5
        this.messages = [
            {id: 1, user:"uid1", room:"roomid-1", msg_text: "message-aaaa" },
            {id: 2,  user:"uid2", room:"roomid-1", msg_text: "message-bbb" },
            {id: 3,  user:"uid3", room:"roomid-1", msg_text: "message-c" },
            {id: 4,  user:"uid1", room:"roomid-2", msg_text: "message-d" }
        ]
    }

    findAll(roomId, callback) {
        let filteredMessages = this.messages.filter((x) => x.room === roomId);

        setTimeout(function() {
            callback(filteredMessages);
        }, 500);    // timeout to simulate http request
    }

    create(obj, callback) {
        obj.id = Math.floor(Math.random() * 10000) // set random id to simulate mongodb
        let messagesCopy = this.messages.slice();
        messagesCopy.push(obj);
        this.messages = messagesCopy;
        setTimeout(function() {
            callback(messagesCopy);
        }, 500);
    }

    find(id) {
        return this.messages.filter((x) => x.id === id);
    }
}

// Export object
export default new FakeBackendService();
