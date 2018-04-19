# Crypt-Note

Store and edit ~encrypted~ notes in the easy to use markdown format

## Project status

**Currently WIP. Do not use.**

The intention of this project is to store notes in the markdown format as encrypted plain text. This project does not have a backend currently, so the files are currently stored as unencrypted .md files and served locally from the repo (static/notes).

Eventually this project will simply be the front-end and make requests to an api for the files. No files will be stored on disk.

I foresee the system having a login. The password would be one way hashed. That password could then act as the key to encrypt/decrypt the notes. I am new to the world of encryption, so I expect this to change.

### Todo

- Save new notes
- Edit a title of an existing note
- Save changes to existing notes
- Look at JavaScript based encryption

### Nice to have

- Move CSS into JSX files
- Duplicate a note
- Delete a note

## Credit

To fill this app with some test markdown notes I have sourced content from:

- [Wikipedia](https://en.wikipedia.org/wiki/Zen_and_the_Art_of_Motorcycle_Maintenance)
- [Rippledoc](http://www.unexpected-vortices.com/sw/rippledoc/quick-markdown-example.html)
- [GitHub](https://github.com/fraction/readme-boilerplate/)