# Volt

You'll have heard of [LastPass](https://lastpass.com/) and [1Password](https://agilebits.com/onepassword)? They are password vaults that store your login credentials for the numerous online services that you are registered with in a secure vault. The idea is that instead of using a single memorable password for all your services ('monkey','julia','rover','password' etc), you use different, non-memorable passwords for each of your services ('uyAxF7Q9LUgHQKXx','Zfbqg7SGMwUc64QE','cHdT98Yugw2FqkCS', etc). Store your passwords in a password vault and secure it with a single hard password that you can remember.

Using this technique, all of your passwords are different and hard to guess, so that if one of your accounts is hacked, the hacker cannot get into all of your other services.

Both LastPass and 1Password offer great tools that not only store the password data, they provide in-browser tools that can auto-fill forms with the values. This is the hard bit because everybody's web forms are differnet, sometimes there's more than one form on a page and login paths can be convoluted. 

But if we ignore the browser woo for the moment, the kernel of the idea is simple

* create a database of passwords 
* allow the records to be retrieved by domain name, so that I can retrieve my Twitter password(s) when I visit twitter.com
* encrypt the username and password information in the database so that if the database is compromised, it can't be decrypted

This could be achieved with a web app but it would be better if the password data was stored locally on the user's disk.

## Password Vault - Volt

So [Volt](#) is a simple Chrome extension that displays a button on your Chrome browser's toolbar. When you click the button it detects which site you are looking at an retrieves any credentials you have stored against that site's domain name and displays them with "copy to clipboard" buttons. 

![screenshot](https://github.com/glynnbird/volt/raw/master/img/volt.png "Volt screen shot")

It stores its data locally using [PouchDB](http://pouchdb.com) so that your password data never leaves the machine. If you want to backup your database you can optionally sync to a CouchDB/Cloudant database so that you have another copy of your precious password collection.

Volt doesn't try to do everything the LastPass or 1Password do, just the basics. It stores the credentials in JSON documents like so:

```js
   {
     "url": "https://www.facebook.com/TorinoFootballClub/?ref=ts&fref=ts",
     "domain": "www.facebook.com",
     "username": "U2FsdGVkX18ZplDfcZcollK3+SnzSmI9Q2rmGCTNWls=", 
     "password":"U2FsdGVkX18f8DMleGDhErIERRaJSWufC91vcYjiGLs="
   }
```

The `username` and `password` fields are encryped using AES using a hash of your Volt password. 

## Installation

This ultility isn't packaged for installatio yet, but you can install it by cloning this repository to your machine and then following the ['Load the extension'](https://developer.chrome.com/extensions/getstarted) instructions.

