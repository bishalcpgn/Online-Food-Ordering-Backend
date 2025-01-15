# Food Ordering System
=========================

A  food ordering backend system built using Node.js (ts), Express.js, and MongoDB.

## Table of Contents
-----------------

* [Overview](#overview)
* [Features](#features)
* [Database](#database)
* [API Documentation](#api-documentation)

## Overview
------------

This project is a backend food ordering system that allows customers to browse and order food from various restaurants. The system consists of a backend API built using Node.js, Express.js, and MongoDB in TypeScript. 

## Features
------------

* Customer registration and login
* Restaurant registration and login
* Food item management
* Order creation 
* User authentication using JWT

## Database
------------

* Uses a MongoDB database with mongoose ODM 


## API Documentation
-------------------

### Admin APIs

* `POST /admin/create-vendor`: Creates a new vendor account.
* `GET /admin/vendors`: Retrieves all vendors.
* `GET /admin/vendor/:id`: Retrieves a specific vendor by ID.


### Customer APIs

* `POST /customer/signup`: Creates a new customer account.
* `POST /customer/login`: Logs in an existing customer account.
* `GET /customer/profile`: Retrieves the customer's profile information.
* `POST /customer/CreateOrder`: Creates a new order for the customer.
* `GET /customer/GetAllOrder`: Retrieves a list of orders for the customer.
* `GET /customer/GetOrder/:id`: Retrieves a specific order by ID.



### Shopping APIs

* `GET /shopping/AvailableVendors`: Retrieves a list of available vendors.
* `GET /shopping/Top-Resturants/:pincode`: Retrieves a list of top restaurants for a given pincode.
* `GET /shopping/AllFoods`: Retrieves a list of all food items.
* `GET /shopping/Resturant/:id`: Retrieves a specific restaurant by ID.



### Vendor APIs

* `POST /vendor/login`: Logs in an existing vendor account.
* `GET /vendor/profile`: Retrieves the vendor's profile information.
* `PUT /vendor/update`: Updates the vendor's profile information.
* `PUT /vendor/profileImage`: Updates the vendor's profile image.
* `POST /vendor/AddFood`: Creates a new food item for the vendor.
* `GET /vendor/GetFood`: Retrieves a list of food items for the vendor.
* `GET /vendor/`: Retrieves a message saying "hi".

