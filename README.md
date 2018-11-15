
# Simple blog web application.

Created for learning purposes.
Check [live demo](https://liu-blog-app.firebaseapp.com).



## Built with:

 - React
 - Redux, Redux Thunk
 - [Firebase](https://console.firebase.google.com) - DB and Hosting
 - React Rich Text Editor ([npm package](https://www.npmjs.com/package/react-rte))



## Features:

 - Everyone can read articles.
 - Only authenticated users can comment and like articles.
 - Only admin user can add new articles, edit or delete existing ones.
 - Rich text editor allows to create formatted article text.
 - Article can contain an image (image URL is required).
 - User can search articles containing specific keywords.
 - Show user friendly error message if network connection is not established.




## Authentication options available so far:

 - Google authentication



## Getting Started

1. Pull the project code to your local machine.

2. Install node modules

```
npm install
```

3. Create your own [Firebase DB](https://console.firebase.google.com/), check Sample Firebase DB Structure:

```
{
  "admin" : "sometestuser@someserver.com",
  "articles" : {
    "-LNbreQ5BmU2eUaaYrYc" : {
      "date" : 1538267130929,
      "id" : "principles-of-exercise-and-sport-training-nvNRl",
      "isActive" : true,
      "tags" : "Principles, Exercise, Sport, Training, Progression",
      "text" : "When you approach your multisport training, the best way to answer your questions is to better understand the principles behind the work you are putting in to improve. These are seven basic principles of exercise or sport training you will want to keep in mind:\n\nEveryone is different and responds differently to training. Some people are able to handle higher volumes of training while others may respond better to higher intensities. This is based on a combination of factors like genetic ability, predominance of muscle fiber types, other factors in your life, chronological or athletic age, and mental state.\n\nImproving your ability in a sport is very specific. If you want to be a great pitcher, running laps will help your overall conditioning but won’t develop your skills at throwing or the power and muscular endurance required to throw a fastball fifty times in a game. Swimming will help improve your aerobic endurance but won’t develop tissue resiliency and muscular endurance for your running legs.\n\nTo reach the roof of your ability, you have to climb the first flight of stairs before you can exit the 20th floor and stare out over the landscape. You can view this from both a technical skills standpoint as well as from an effort/distance standpoint. In order to swim the 500 freestyle, you need to be able to maintain your body position and breathing pattern well enough to complete the distance. In order to swim the 500 freestyle, you also need to build your muscular endurance well enough to repeat the necessary motions enough times to finish.\n\nTo increase strength and endurance, you need to add new resistance or time/intensity to your efforts. This principle works in concert with progression. To run a 10-kilometer race, athletes need to build up distance over repeated sessions in a reasonable manner in order to improve muscle adaptation as well as improve soft tissue strength/resiliency. Any demanding exercise attempted too soon risks injury. The same principle holds true for strength and power exercises.\n\nOver time the body becomes accustomed to exercising at a given level. This adaptation results in improved efficiency, less effort and less muscle breakdown at that level. That is why the first time you ran two miles you were sore after, but now it’s just a warm up for your main workout. This is why you need to change the stimulus via higher intensity or longer duration in order to continue improvements. The same holds true for adapting to lesser amounts of exercise.\n\nThe body cannot repair itself without rest and time to recover. Both short periods like hours between multiple sessions in a day and longer periods like days or weeks to recover from a long season are necessary to ensure your body does not suffer from exhaustion or overuse injuries. Motivated athletes often neglect this. At the basic level, the more you train the more sleep your body needs, despite the adaptations you have made to said training.\n\nIf you discontinue application of a particular exercise like running five miles or bench pressing 150 pounds 10 times, you will lose the ability to successfully complete that exercise. Your muscles will atrophy and the cellular adaptations like increased capillaries (blood flow to the muscles) and mitochondria density will reverse. You can slow this rate of loss substantially by conducting a maintenance/reduced program of training during periods where life gets in the way, and is why just about all sports coaches ask their athletes to stay active in the offseason.",
      "title" : "Principles of Exercise and Sport Training",
      "userEmail" : "sometestemail@someserver.com"
    },
    "-LNfWGAHFXtTLsLFo-zR" : {
      "date" : 1538328368742,
      "id" : "progressive-web-apps-jFU21",
      "isActive" : true,
      "tags" : "progressive, web, app, checklist",
      "text" : "Progressive web apps use modern web APIs along with traditional progressive enhancement strategy to create cross-platform web applications. These apps work everywhere and provide several features that give them the same user experience advantages as native apps. This set of docs and guides tell you all you need to know about PWAs.\nPWAs should be discoverable, installable, linkable, network independent, progressive, re-engageable, responsive, and safe. To find out more about what these mean, read Progressive web app advantages. To find out how to implement PWAs, consult the guides listed in the below section.\nTo help teams create the best possible experiences we've put together this checklist which breaks down all the things we think it takes to be a Baseline PWA, and how to take that a step further with an Exemplary PWA by providing a more meaningful offline experience, reaching interactive even faster and taking care of many more important details.",
      "title" : "Progressive Web Apps",
      "userEmail" : "sometestemail@someserver.com"
    }
  },
  "comments" : {
    "1" : {
      "articleId" : "principles-of-exercise-and-sport-training-nvNRl",
      "date" : 1537883301291,
      "id" : 1,
      "text" : "Something very powerful happens when you get into the habit of ordering and writing down your thoughts, ideas, stories and opinions.",
      "userEmail" : "sometestemail@someserver.com"
    },
    "2" : {
      "articleId" : "principles-of-exercise-and-sport-training-nvNRl",
      "date" : 1537969835416,
      "id" : 2,
      "text" : "I’m not saying every blog will be profitable. But many bloggers have grown income streams from their blogging, both directly and indirectly.",
      "userEmail" : "anothertestuser@someserver.com"
    }
  },
  "users" : {
    "anothertestuser-someserver-com" : {
      "displayName" : "Nicky Test",
      "email" : "anothertestuser@someserver.com",
      "photoURL" : "https://openclipart.org/image/2400px/svg_to_png/277081/Male-Avatar.png"
    },
    "sometestemail-someserver-com" : {
      "displayName" : "Admin user",
      "email" : "sometestemail@someserver.com",
      "photoURL" : "https://openclipart.org/image/2400px/svg_to_png/277086/Female-Avatar-2.png"
    },
  "likes" : {
    "-LNbreQ5BmU2eUaaYrYc" : "sometestemail@someserver.com, anothertestuser@someserver.com",
    "-LNfWGAHFXtTLsLFo-zR" : "anothertestuser@someserver.com"
  }
}
```

4. Set Firebase DB rules according to the sample:

```
{
  "rules": {
    "articles": {
      ".read": "true",
      ".write": "auth !== null && auth.email == 'sometestuser@someserver.com'",
      ".indexOn": "id"
    },
    "comments": {
      ".read": "true",
      ".write": "auth != null",
      ".indexOn": "articleId"
    },
    "admin": {
      ".read": "auth != null",
      ".write": "false"
    },
    "users": {
      ".read": "true",
      ".write": "auth != null",
      ".indexOn": "email"
    },
    "likes": {
      ".read": "true",
      ".write": "auth !== null",
      ".indexOn": "id"
    }
  }
}

```


5. Create empty *blog-app/.env* file and copy your firebase DB settings into it:

```
REACT_APP_FIREBASE_API_KEY=XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
REACT_APP_FIREBASE_AUTH_DOMAIN=XXXXXXXXXXXX.firebaseapp.com
REACT_APP_FIREBASE_DATABASE_URL=https://XXXXXXXXXXXX.firebaseio.com
REACT_APP_FIREBASE_PROJECT_ID=XXXXXXXXXXXX
REACT_APP_FIREBASE_STORAGE_BUCKET=XXXXXXXXXXXX.appspot.com
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=XXXXXXXXXXXXX

```

6. Run dev server and compile code:

```
npm start
```




## Author

* **Liubov Kozyr** - [Github](https://github.com/lkozyr/)



## Assets used in the app:

1. Images:

 - [1](https://www.iconfinder.com/icons/1061161/journey_moleskine_notepad_notes_pencil_travel_write_icon)
 - [2](https://www.iconfinder.com/icons/115695/find_magnifying_glass_search_zoom_icon)
 - [3](https://www.iconfinder.com/icons/290134/draw_edit_pen_pencil_write_icon)
 - [4](https://www.iconfinder.com/icons/216078/facebook_social_icon)
 - [5](https://www.iconfinder.com/icons/104501/bird_twitter_icon)
 - [6](https://www.iconfinder.com/icons/394189/code_github_repository_icon)
 - [7](https://www.iconfinder.com/icons/1814108/email_envenlope_letter_mail_icon)
 - [8](https://www.iconfinder.com/icons/2534298/approved_hand_like_thumbs_up_icon)
 - [9](https://www.iconfinder.com/icons/2180513/facebook_fb_like_thumbs_up_icon)
 - [10](https://www.iconfinder.com/icons/2180494/comment_facebook_message_notification_icon)
 - [11](https://www.iconfinder.com/icons/2534334/chat_comment_inbox_message_icon)


2. Fonts: 

 - [1](https://fonts.googleapis.com/css?family=Pacifico)



 ## Nice to have features:

 - Add teaser image to show in the articles list
 - Add logic for 'isPublished' checkbox
 - Login with FB, Twitter, username and password
 - Add pagination / lazyload
 - set search query to local storage
 - add loader (for getArticles, getArticleDetails)
