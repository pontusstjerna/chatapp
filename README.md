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


Diverse: Roller i applikationen, authentisiering, validering, felhantering, i18n, ...
* Roles in the application: Components from react?
