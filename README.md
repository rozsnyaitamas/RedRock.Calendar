# RedRock.Calendar

## Client Generation

Make sure you have the following package installed: 
  npm i npm-run-all

In the root folder open a CMD and run the following comands: 
1. npm run build
2. npm run generate-swagger-file

Then, in the Frontend\RecRock-Calendar-Frontend folder run:
3. npm run generate-api-client


The clients.ts will be added to the Tools\\APIClientGenerator\\GeneratedClients folder. You will have to add this file manually to the solution (right click on the GeneratedClients folder -> Add -> Add Existing Items and choose the generated clients.ts file)
