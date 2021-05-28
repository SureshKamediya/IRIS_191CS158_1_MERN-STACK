### Setup instructions

-------------------------------------

1. Clone this repository in your system.
2. Just check that node and npm are installed in your system.
3. Just make sure that your mongoDB server running on your system.
4. Run npm install and then also install nodemon.
5. Enter in server directory and then command <u>nodemon server.js</u> and the server start on the specified port.
6. The frontend code is in client directory so just open another terminal, enter in client directory and run command <u>npm start</u> and your project start on localhost:3000 on your chrome.

----------------------------------------------------


### _List of implemented features_

**Admin controls**
1. Add new clubs.
2. He can see all users and can add them into any club and can also change their club whenever needed but a user can only be a member of single club at a time.
3. Can make a particluar member of a club as a convener of that club and can change convener of the club at any time.
4. He can see all the requests of the users but can't approve or reject that request.

*Bugs*

No bugs in admin control but code is not commented properly and some axios functions are in main code rather than in their helper functions but all things are working properly.

*Features non-implemented*
  
1. A member can be in single club.
2. Forgot to add his profile page.

--------------------------------------------------
**Convener controls**
1. He can see all the members of his club.
2. Can add a new item.
3. Can see all the requests from the members in that club and can reject or approve them with a feedback and can see how much quantity of any item is present so that he can deny other requests if the avilabe quantity is 0 of that item.
4. And he can see list of all the items present in the club.

*Bugs*

No bugs in code but didn't added image feature in the item model.

*Non-implemented features*

1. Convener can't see to whom all he have distributed his items.
2. Forgot to add his profile page.

---------------------------------------------------
**Member**

1. Can't access anything if he is not the member of any club.
2. Can see all the items available in his club and can request for any item.
3. He can see all his requests which he had asked for and can see feedbacks if the convener rejected or approved it and can see which all are in awaiting approval.
4. He can see all of his items in his my items list or the items which convener approved him.

*Bugs*

No bugs in the implemented feature but from my request page I have to refesh the page when go back to dashboard page of the member.

*Non-implemented featues*

1. When requesting how much qunatity he need for that item he has to request that much time(the option to how much quantity he need hasn't been added).
2. Forgot to add his profile page.

-------------------------------------------------

*References used*

1. [React Js Docs](https://reactjs.org/)
2. [About MERN](https://blog.logrocket.com/mern-stack-tutorial/)

----------------------------------------------------

Screenshots are added in screenshots folder

----------------------------------------------------
