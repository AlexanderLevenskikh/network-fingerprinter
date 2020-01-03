if [[ $# -ne 1 ]] ; then
    echo "usage: kibana-template.sh node"
    exit
fi

curl -i -X POST \
   -H "Content-Type:application/json" \
   -H "kbn-xsrf:anything" \
   -d \
'{
  "attributes": {
    "title": "packets-*",
    "timeFieldName": "timestamp"
  }
}' \
 'http://'$1'/api/saved_objects/index-pattern/packets-*'
