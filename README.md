# BlogBack

A minimal NodeJS + ExpressJS server for a bloging platform.  
This was built to be used in conjunction with [https://github.com/charkops/blog_front](https://github.com/charkops/blog_front) for educational purposes. This is in no way, shape or form ment to be a production ready blogging platform. There has been a gross over-simplification in many areas of this server.

## Developing

**Before** starting the developing server, you will need to setup a developing mysql server.  
You can change the config for the database in [config/database.config.js](config/database.config.js)

After you have set up the development db, you can simply:

```bash
git clone https://github.com/charkops/blog_back
cd blog_back
npm install
npm start
```