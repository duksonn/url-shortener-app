<h1 align="center">url-shortener-app<br></h1>
<h4 align="center">Service for creating shorts URLs</h4>

### External dependencies
* _MongoDB_

## Endpoints
### Create short URL 
#### Request
   ```shell
   POST /api/url/short
   {
      "orig_url": "https://some-url.com",
   }
   ```
#### Response
- URL entity
   ```shell
   {
      "_id":{"$oid":"64838aede12abbb4c9495789"},
      "urlId":"KMOGnMSr3BjVlCBEgty-s",
      "origUrl":"https://www.some-url.com.ar/",
      "shortUrl":"http://localhost:3333/KMOGnMSr3BjVlCBEgty-s",
      "clicks":{"$numberInt":"0"},
      "date":"Fri Jun 09 2023 17:26:21 GMT-0300 (Argentina Standard Time)",
      "__v":{"$numberInt":"0"}
   }
   ```

### Get long URL 
#### Request
- No body required
   ```shell
   GET /api/url/long/:urlId
   ```
#### Response
   ```shell
   {
      "orig_url": "https://some-url.com"
   }
   ```

### Delete short URL 
#### Request
   ```shell
   DELETE /api/url/delete/:urlId
   ```
#### Response
- 204 No content


### Redirect to original URL
#### Request
   ```shell
   GET /api/url/:urlId
   ```
