# Volt

You'll have heard of [LastPass](https://lastpass.com/) and [1Password](https://agilebits.com/onepassword)? They are password vaults that store login credentials: your Facebook login, your email password, etc. Instead of using a single memorable password for all your services ('monkey','julia','rover','password' etc), you use different, non-memorable passwords for each of your services ('uyAxF7Q9LUgHQKXx','Zfbqg7SGMwUc64QE','cHdT98Yugw2FqkCS', etc), store your passwords in a password vault and secure it with a single hard password that you can remember.

Using this technique, all of your passwords are *different* and *hard to guess*, so that if one of your accounts is hacked, the hacker cannot get into all of your other online services.

As well as storage, both LastPass and 1Password offer great tools that can auto-fill forms with the stored values. This is the hard bit because every website's forms are differnet, sometimes there's more than one form on a page and login paths can be convoluted. 

But if we ignore the browser magic for the moment, the kernel of the idea is simple

* create a database of passwords 
* allow the records to be retrieved by domain name, so that I can retrieve my Twitter password(s) when I visit twitter.com
* encrypt the username and password information in the database so that if the database is compromised, it can't be decrypted without the master password

## What is Volt?

So [Volt](#) is a simple Chrome extension that displays a button on your Chrome browser's toolbar. 

![browser screenshot](https://github.com/glynnbird/volt/raw/master/img/volt-browser.png "Volt browser screenshot")

It is a single-page, web app that stores its data locally inside the browser using [PouchDB](http://pouchdb.com) so that your password data never leaves the machine (unless you choose to sync it to an external databae - see Syncing with Cloudant). 

## Installation

Volt isn't packaged for installation yet from the Chrome Store yet, but you can install it by cloning this repository to your machine and then following these ['Load the extension'](https://developer.chrome.com/extensions/getstarted) instructions.

## First-time use

When you first click the Volt button, it prompts for a master password. This should be a strong password that you can remember. It will form the basis of the value that is used to encrypt your database.

![login screenshot](https://github.com/glynnbird/volt/raw/master/img/volt-login.png "Volt login screenshot")

Volt takes your password, puts it through the [PBKDF2](https://en.wikipedia.org/wiki/PBKDF2) algorithm to calculate the key it will use to encrypt and decrypt your data. A new vault database is created locally using PouchDB. 

Once logged in you should see an empty vault:

![empty screenshot](https://github.com/glynnbird/volt/raw/master/img/volt-empty.png "Volt empty screenshot")

There is a toolbar acrosss the top:

* plus icon: add an item to the vault
* magnify icon: search
* cloud icon: sync to Cloudant
* power off icon: log out of Volt

## Adding credentials to Volt

Click the plus icon:

![add screenshot](https://github.com/glynnbird/volt/raw/master/img/volt-add.png "Volt add screenshot")

The URL is pre-filled with the URL of the current Chrome tab you are viewing. Add a username, password and optionally a note and press the "Add" button to save it. The username and password valus are encrypted before saving. You are allowed multiple entries per website.

## Viewing credentials

Once you have some data in your Volt database, select the website you need to retrieve credentials for and click the Volt button to see a list of matching items:

![matches screenshot](https://github.com/glynnbird/volt/raw/master/img/volt-matches.png "Volt matches screenshot")

Each entry is presented in a table with "Copy" buttons allowing the username and password to be transferred into your system clipboard. Entries can be deleted by clicking the corresponding "X" icon. 

## Searching for credentials

You can also search for credentials using PouchDB's [free-text search](https://github.com/nolanlawson/pouchdb-quick-search) library. Simply click the magnify icon to popup the search box:

![search screenshot](https://github.com/glynnbird/volt/raw/master/img/volt-search.png "Volt search screenshot")

Enter the phrase you want to search for and any matching items will be shown in a list.

## Syncing with Cloudant

If you want to backup your database you can optionally sync to an Apache CouchDB or IBM Cloudant database so that you have another copy of your precious password collection. Click the cloud icon to open the sync popup:

![sync screenshot](https://github.com/glynnbird/volt/raw/master/img/volt-sync.png "Volt sync screenshot")

Enter the URL of a Cloudant or CouchDB database, including any credentials and the database name e.g.

    https://myusername:mypassword@myhost.cloudant.com/voltbackup

Clicking 'Sync' instructs PouchDB to synchronise its data with the URL you supplied: your password database will be backed up and any new changes on the remote database will arrive in your local database.

![sync screenshot](https://github.com/glynnbird/volt/raw/master/img/volt-sync1.png "Volt sync screenshot")

## Logging out of Volt

Click the 'power' button on the top bar. You will be logged out of Volt and see the login popup again. Your password data is still there, but it cannot be accessed without supplying your master password again.

## Schema

Volt stores its data in JSON documents like so:

```js
   {
     "url": "https://www.facebook.com/TorinoFootballClub/?ref=ts&fref=ts",
     "domain": "www.facebook.com",
     "username": "U2FsdGVkcollK3+SnzSmI9Q2X18ZplDfcZrmGCTNWls=", 
     "password":"U2FsdGVkXMleGDhErIERR18f8DaJSWufC91vcYjiGLs=",
     "notes": "personal fb"
   }
```

The `username` and `password` fields are encryped using AES using the PBKDF2 hash of your Volt password as the key. 

## Disclaimer

* this is sample application to demonstrate PouchDB's use in a Chrome Extension - be careful if you want to use it in anger
* you must have the password to decrypt your data - there is no password recovery 
* there is only one copy of your data (unless you sync to Cloudant)
* use at your own risk

## Todo

* better icon
* 


