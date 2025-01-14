/* 

This file 


https://mongoosejs.com/docs/typescript.html


                    Mongoose with TypeScript         

                     +----------------------------+
                     |       MongoDB Collection   |  ( Data stored in Database)
                     +----------------------------+
                              | (is wrapped by)
                              ▼
                     +----------------------------+
                     |          Model             |  (Blueprint for documents/collection)
                     | - Used to create documents |
                     | - Access methods like:     |
                     |   .find(), .create()       |
                     +----------------------------+
                              |
                              | (based on)
                              ▼
                     +----------------------------+
                     |           Schema           |  (Structure for documents)
                     | - Defines fields and types |
                     | - Includes validation,     |
                     |   default values, etc.     |
                     +----------------------------+
                              |
                              | (used to generate)
                              ▼
                     +----------------------------+
                     |         Document           |  (Instance of a model)
                     | - Represents one record    |  ( Represents single record of Model )
                     | - Has data + methods       |
                     | - Example:                 |
                     |   .save(), .toObject()     |
                     +----------------------------+
                              |
                              | (type safety for)
                              ▼
                     +----------------------------+
                     |        Interface           |  (TypeScript-only construct)
                     | - Defines custom fields    |
                     | - Extends Document to      |
                     |   include Mongoose methods |
                     +----------------------------+



*/