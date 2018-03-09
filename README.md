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

## Usecases updated:  (should be at minimun 10)
- [x] Send and Receive messages in Real-time in chat rooms.
- [x] Switch between different chat rooms
- [x] Create new room (if logged in)
- [x] User registration
- [x] User login/logout , (Authenticationwith OAuth2?)
- [x] See time since posted for messages
- [x] User settings page (update profile)
- [ ] Upload image for avatar
- [x] Generate default avatars
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
