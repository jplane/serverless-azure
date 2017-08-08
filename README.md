## A simple Node.js API for hosting on Azure Functions
## Walkthrough:  https://www.youtube.com/watch?v=8H4mROvgD9g

1. log into the Azure portal... https://portal.azure.com (you'll need to sign up for a subscription if you don't already have one)

1. provision an Azure Function App

1. provision a DocDB account and then create database ("default" in the video) and collection ("comments")

1. update the app settings in Func app to point to DocDB... you'll need the following settings:

    - "HOST": URI of your DocDB account
    - "AUTH_KEY": found under "Keys" in DocDB account settings
    - "DATABASE": the name of your DocDB database
    - "COLLECTION": the name of your DocDB collection

1. fork this repo and then setup your Function app for continuous integration by pointing it to the forked repo in your GitHub account

1. clone (or fork) the serverless-azure-client github repo

1. in your copy of the client repo, update config.js to point to the Function app (using the Function app URI and access codes for each API)

1. in your Azure storage account, create the "$root" blob container (use access type = Blob)

1. using Storage Explorer (or whatever), upload the html + js assets from the client repo to the root newly created $root container

1. right-click index.html in Storage Explorer to get the URL

1. setup CORS in your Function app by adding the URL root of the HTML file in blob storage to the list of allowed URLs in the CORS list

1. browse to the URL for index.html in blob storage
