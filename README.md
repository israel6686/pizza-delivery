# piz=zza-delivery-env
    npm install
    npm start
    lisen on port 6666


# piz=zza-delivery-API
MANAGE_USER: "create or edit user"

PUT /manage_users?userName=xxxxxx&email=xxxxxx@xxxx&address=xxxxx" 

mandatory url params : userName email address

example:
curl -gv -X PUT "localhost:6666/manage_users?userName=iitzhako&email=israel6686@gmail.com&address=dhemi"

"delete user"

DELETE /manage_users?userName=xxxxxx"

mandatory url params :userName

example:
curl -gv -X DELETE "localhost:6666/manage_users?userName=iitzhako"

"get user data"
GET //manage_users?userName=xxxxxx"

mandatory url params :userName

example:
curl -gv -X GET "localhost:6666/manage_users?userName=iitzhako"


LOGIN: "create token for user"
POST /login?userName=xxxxxx"

mandatory url params :userName

curl -gv -X POST "localhost:6666/login?userName=xxxxx"

return token on "authorization" Header



LOGOUT: "delete token for user"

DELETE /logout?userName=xxxxxx"

mandatory url params :userName

curl -gv -X DELETE "localhost:6666/logout?userName=new" 


MENU: "get pizza menu"
GET /menu?userName=xxxxx

curl -gv -X GET "localhost:6666/menu?userName=iitzhako" -H 'Authorization: tokenxxxxxxxx'

mandatory url params :userName
mandatory headers: Authorization "from login API"


SHOPPING:
POST /shopping?userName=xxxxx
  mandatory url params :userName
  mandatory headers: Authorization "from login API" , Content-Type  
  mandatory body: see below
  
 curl -gv -X POST "localhost:6666/shopping?userName=iitzhako" -H 'Content-Type: application/json' -H 'Authorization: tokenxxxxxxxx' -d @data.json
 
 data.json  = [{
          "selectedItem": "pizza_one",
          "size" :  "medium",
          "extras" : "cheese"
        },
          {
            "selectedItem": "pizza_two",
            "size" :  "medium",
            "extras" : "cheese"
          }
   ]

CHARGE:

POST /charge?userName=xxxxx
     mandatory url params :userName
     mandatory headers: Authorization "from login API" , Content-Type     


 curl -gv -X POST "localhost:6666/charge?userName=iitzhako" -H 'Content-Type: application/json' -H 'Authorization: tokenxxxxxxxx'