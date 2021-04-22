#! /bin/bash

npm run build && cp -r build/images ~/cm3/ && cp -r build/static ~/cm3/ && supervisorctl restart aoe3cm2
