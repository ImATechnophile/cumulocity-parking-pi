# Parking-Pi

Parking-Pi is an AngularJS application built on **Cumulocity web SDK** also known as Cumulocity Parking-Pi application.Parking-Pi gives you very fast visibility and control over your remote parking slots, be these companies parking slot, malls parking slot, hospital or any other parking slots that you need to know whether the free space is available or not.

## Getting Started

Just clone this repository and follow the below Prerequisites

### Prerequisites

Before getting into this project You should be familiar with the following technologies:

* HTML5 and CSS.
* JavaScript
* AngularJS 1.x.

Software requirements:

* You will need [Node.js](https://nodejs.org/en/), (6.7 or newer)
* You will need [npm](https://www.npmjs.com/), (installed with Node.js)
* You will need access to your Cumulocity account, i.e. you need your tenant name, username and password.(Create a 1 month *free account* in [cumulocity.com](https://www.cumulocity.com/)


### Installing

Once all prerequisites are fulfilled, you are almost ready to see the Parking-Pi application in your desktop. For the process of deploying our Parking-Pi, you will need the npm package "cumulocity-tools" installed globally on your machine. 

To install the npm package, execute the following command on your terminal.

```
$ npm i cumulocity-tools -g
```

## Deployment

CREATE THE APPLICATION IN YOUR TENANT.Follow the below steps on your terminal with your Cumulocity credentials.
```
$ c8y deploy:app parking_pi
? Tenant yourTenantName
? User yourUserName
? Password ***********
? Base url https://yourTenantName.cumulocity.com
GET application/applicationsByOwner/yourTenantName?pageSize=10000 200
POST application/applications/31337/binaries/ 201
PUT /application/applications/31337 200
```

Add additional notes about how to deploy this on a live system

## Built With

* [Dropwizard](http://www.dropwizard.io/1.0.2/docs/) - The web framework used
* [Maven](https://maven.apache.org/) - Dependency Management
* [ROME](https://rometools.github.io/rome/) - Used to generate RSS Feeds

## Contributing

Please read [CONTRIBUTING.md](https://gist.github.com/PurpleBooth/b24679402957c63ec426) for details on our code of conduct, and the process for submitting pull requests to us.

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/your/project/tags). 

## Authors

* **Billie Thompson** - *Initial work* - [PurpleBooth](https://github.com/PurpleBooth)

See also the list of [contributors](https://github.com/your/project/contributors) who participated in this project.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

* Hat tip to anyone who's code was used
* Inspiration
* etc
