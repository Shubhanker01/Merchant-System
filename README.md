Load Testing Summary 
1. Login Endpoint
   Performance was tested using Artillery to simulate concurrent POST requests to the login route. The system handled the requests reliably with consistent response times and no failures.
   🔧 Test Setup
   Tool: Artillery
   Requests: 60 POST requests (mix of valid and invalid credentials)
   Concurrency: ~2 requests per second
   Users in DB: Pre-populated for valid login attempts
   | Metric                  | Value  |
   | ----------------------- | ------ |
   | Successful logins (200) | 43     |
   | Invalid logins (404)    | 17     |
   | Failed users            | 0      |
   | Mean response time      | 259 ms |
   | Max response time       | 404 ms |
   | 95th percentile (p95)   | 376 ms |
