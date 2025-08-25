# Serve a protocol locally

Copy the example.env file:

```bash
cp example.env .env
```

Then edit it to point to the directory that contains your reproschema protocol, in this case PHQ-9:

```bash
# Example environment file for development protocol selection

# For PROTOCOL, UI, and REPROSCHEMA we reference folders stored
# locally in this folder. Those folders are generated after the 
# the submodules are cloned

# Set this to the folder name of the protocol you want to serve
# /activities and / are served from the protocol path
PROTOCOL=reproschema-library/activities/PHQ-9
BACKEND_PORT=3508
UI=reproschema-ui
REPROSCHEMA=reproschema
```

Then just go ahead and run `node server.js`:

```bash
node server.js
Starting http-server, serving reproschema-library/activities/PHQ-9 on port 3508
No process found on port 3508
Server running at http://localhost:3508
Serving files from: reproschema-library/activities/PHQ-9 at http://localhost:3508
REPROSCHEMA_GITHUB_SRC: http://localhost:3508
```

Lastly cd into reproschema-ui and run `npm run serve`:

```bash
cd reproschema-ui && npm run serve
```

Then navigate to port 8080 on local host or to the address listed below `App running at:` in the console output:

```bash
...
You may use special comments to disable some warnings.
Use // eslint-disable-next-line to ignore the next line.
Use /* eslint-disable */ to ignore all warnings in a file.

  App running at:
  - Local:   http://localhost:8080/ 
  - Network: http://10.37.95.65:8080/
```
