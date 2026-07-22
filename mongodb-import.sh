npm install mongodb csv-parse yargs
node mongodb-import.js --mongourl "mongodb+srv://bleauskylar_db_user:MlEQq7DesH6SkTGN@swe-summer26.yj0uny1.mongodb.net/?appName=SWE-Summer26" \
--database uscities-microservices --collection uscities --file uscities.csv --format csv
