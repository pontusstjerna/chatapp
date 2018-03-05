# chatapp
Project in course Web Applications

## Checklist (preliminary)
Vad tänker ni göra? Vilken sorts applikation?
## Real time chat application
* Real time chat rooms
* Navigation between chat rooms
* User registration and settings page
* Chat rooms with categories (internet forum inspired) - initially static
* Authentication with OAuth2

Vilken plattform (JEE/Node)? Ev. ramverk, API:n? Utvecklingsmiljö?
* MERN (Mongo - Express - React - Node) stack

Vilka use cases	har ni tänkt er?
# As a user I can
* register and log in on the webapp with my facebook or google account
* browse different chat rooms in different categories
* can enter any public chatroom
* send and receive messages in a public chatroom
* change my profile settings, such as nickname
* not use any profanity
* maybe change language of the webapp

---------
## Usecases updated:  (sould be at minimun 10)
- [x] Send and Receive messages in Real-time in chat rooms.
- [x] Switch between different chat rooms
- [x] Create new room (if logged in)
- [ ] User registration
- [ ] User login/logout , (Authenticationwith OAuth2?)
- [x] See time since posted for messages 
- [ ] User settings page (update profile)
- [ ] Upload image for avatar
- [ ] Generate default avatars
- [x] filter out bad language
- [ ] Chat rooms with categories (internet forum inspired) - initially static
- [ ] Show public User profile (some info about user? age, gender, mail, about etc...)
- [ ] Show user statistics on profile page
- [ ] Make mobilanpassad
- [ ] private rooms, invitations?
- [ ] direct messages
- [ ] change language of the webapp



Rita en bild på den övergripande arkitekturen/designen
* See picture.

M.h.a. bilden , kör ett use case (flödet)
1. User writes message in React client
2. User sends message through websocket API
3. Backend receives message, stores it in database
4. Backend broadcasts the message to all listeners on the websocket
5. The chat window component is rerendered for all users in the React client

Process: Vem gör vad?
1. Create basic chat room without db and auth
2. Add database
3. Add users
4. Add chat rooms
5. ...
### Some roles
* Initially Henrik and Henry on backend and Johanna and Pontus on frontend
* Then rotate

Diverse: Roller i applikationen, authentisiering, validering, felhantering, i18n, ...
* In React everything is component based
* ...


## API:

### /users
Function | API | Body parameters | Returns
---|---|---|---
List all users        | *GET* /users              | -            | all users
Get single user       | *GET* /users/:id          | -            | single user
Add user              | *POST* /users             | new user         | status
Update user           | *PUT* /users/:id          | new user         | status
Remove user           | *DELETE* /users/:id       | -            | status

### /rooms
Function | API | Body parameters | Returns
---|---|---|---
List all rooms        | *GET* /rooms              | -            | all rooms
Get single room       | *GET* /rooms/:id          | -            | single
Get all messages in room | *GET* /rooms/:id/messages | -         | messages with roomid
Add room              | *POST* /rooms             | new room         | status
Update room           | *PUT* /rooms/:id          | new room         | status
Remove room           | *DELETE* /rooms/:id       | -            | status

### /messages
Function | API | Body parameters | Returns
---|---|---|---
List all messages        | *GET* /messages              | -            | all messages
Get single message       | *GET* /messages/:id          | -            | single
Add message              | *POST* /messages             | new message         | status
Update message           | *PUT* /messages/:id          | new message         | status
Remove message           | *DELETE* /messages/:id       | -            | status
