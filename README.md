# English Premier League Fantasy Football Picker

By Mark Ellis

<table>
<tr>
<td>
  This is a proof of concept app for fans of English Premiere League Football, playing in weekly Fantasy Leagues.

  The objective is to aid one in selecting the best players to put in his or her side each week, based on stats from the current season. Users may login and adjust their team lineup on a weekly basis, based on stats for that Gameweek.

  I had originally planned to use an API, but was unable to find an accessible free API containing all the data I wanted. A helpful individual in the dev community was gracious enough to provide me with directories of many xml documents containing ALL the statistical data from the current season. I then had to convert them to json files and iterate over them to extract only the information I intended to use. I then created a "cloud API" of data using Firebase from which I made requests via this app. A separate API was set up under Firebase to store information about the User and their team.
</td>
</tr>
</table>

![alt text](../images/EPL_FFP_ScreenShot.png "Description of this app")

## Site
![](/images/read_me_images/Screen%20Shot%202017-03-10%20at%203.28.51%20PM.png "Home page")

### Landing Page
Here a User is invited to login or register as a new User.

![](/images/read_me_images/Screen%20Shot%202017-03-10%20at%203.28.56%20PM.png "Login")

### Team Selection Page
Upon login, the User's previously selected squad is shown. Here they may edit Team Name and Gameweek information.

![](/images/read_me_images/Screen%20Shot%202017-03-10%20at%203.29.42%20PM.png "Login")

## Built with

- [Angular](https://www.w3schools.com/angular/angular_intro.asp) - Angular is a Javascript framework offering two way data binding and sepaaration of concerns using factories and controllers.
- [Google Chart API](https://developers.google.com/chart/interactive/docs/quick_start) - Free , Rich Gallery , Customizable and Cross-browser compatible.
- [Bootstrap](http://getbootstrap.com/) - Extensive list of components and  Bundled Javascript plugins.

## Todo
- Add multiple gameweek stats from which to choose.
- Add team logos.
- Mobile version.

## Team

[![Mark Ellis](https://avatars1.githubusercontent.com/u/20229705?v=3&u=f2f9e8b581f01b12eb8ab716a9a47a28e10001b5&s=400)](https://github.com/markellisdev)
[Mark Ellis ](https://github.com/markellisdev)