Frequently Asked Questions (FAQs)
API Basics
What is an API?
What is JSON?
What is REST?
What is x-www-form-urlencoded?
Registration
How is BLS Public Data API Version 2.0 different from Version 1.0?
Do I have to register to use the BLS Public Data API?
How do I register for BLS Public Data API Version 2.0?
Do I have to renew my registration?
Signatures and Responses
Which API Signature do I use?
Can I use API 1.0 signatures with API 2.0?
I don't know the series ID(s) for the data I want to access. How do I find the ID(s)?
How many requests can I make daily?
How many series can I include in a query?
How many years can I request per query?
How do I request net and percent changes in a signature?
Will my JSON response include metadata?
Errors and Response Codes
"Series does not exist" error.
"Database is locked for Series" error.
"No Data Available for Series" error.
How do I format the year for my request?
"415 Unsupported Media Type" error.
I received an HTTP status/response code with my request. What does the code mean?
My request won't return "catalog" data. What happened?
I received an 'Unknown SSL protocol error in connection to api.bls.gov:443'.
I received a "429 Too Many Requests" error. What does this mean?
Other
I didn't see sample code for my language.
What is an API?
An API (Application Programming Interface) is a tool that allows third party developers and organizations to access and manipulate data. The BLS Public Data API allows such users to access and manipulate published BLS survey data.
 
What is JSON?
JSON (JavaScript Object Notation) is a user-friendly, text-based data-interchange format of communication, used primarily to transmit data between applications and servers over network connections. It is an independent language, and there are parsers available for many languages, including Java, Ruby/Ruby on Rails, and Unix Command Line, for which we have provided sample code.
 
What is REST?
REST (Representational state transfer) is a type of software architecture, in which clients send requests to servers, and servers return responses after processing requests. It is the most commonly used architecture for APIs. The BLS Public Data API uses REST architecture.
 
What is x-www-form-urlencoded?
x-www-form-urlencoded is a content type for an HTTP request where the body of the request is composed of name/value pairs separated by the ampersand (&), and the names are separated from the values by the equals symbol (=).
 
How is API Version 2.0 different from Version 1.0?
API Version 2.0 requires registration, and it offers greater query limits. It also allows users to request net and percent changes and series description information. See below for more details.
Service	Version 2.0
(Registered)	Version 1.0
(Unregistered)
Daily query limit	500	25
Series per query limit	50	25
Years per query limit	20	10
Request rate limit	50 requests per 10 seconds	50 requests per 10 seconds
Net/Percent Changes	Yes	No
Optional annual averages	Yes	No
Series description information (catalog)	Yes	No
 
Do I have to register to use the BLS Public Data API?
Registration is required for Version 2.0 of the BLS Public Data API. Registered users are offered higher usage API limits as shown in the table above and access to additional capabilities.
 
How do I register to for BLS Public Data API Version 2.0?
To register, go to the BLS Public Data API 2.0 registration page, and enter your email address and organization name. Complete the CAPTCHA. You will receive an email from labstat@bls.gov with your registration key. Be sure to use this registration key in your requests to receive the expanded access that Version 2.0 provides.
 
Do I have to renew my registration?
Yes. Users must renew registration with the BLS Public Data API at least once a year.
Which API Signature do I use?
If you would like to return data for a single timeseries, you should use the Single Series signature. If you would like to return data for multiple timeseries, you should use the Multiple Series signature. The Single Series and Multiple Series signatures will return a three-year period of data by default.
If you would like to return data for a set period of time, you should use the One or More Series with Optional Parameters signature. For Version 1.0 signatures, click here.
 
Can I use API 1.0 signatures with API 2.0?
Yes, API 1.0 signature are compatible with API Version 2.0.
 
I don't know the series ID(s) for the data I want to access. How do I find the ID(s)?
The BLS Public Data API requires users to know the series ID to request data. We do not currently have a catalogue of series IDs, but all BLS series IDs follow a similar format.
 
How many requests can I make daily?
Registered users may request up to 500 queries daily. Unregistered users may request up to 25 queries daily.
 
How many series can I include in a query?
Registered users may request up to 50 series per query. Unregistered users may request up to 25 series per query.
 
How many years can I request per query?
Registered users may request up to 20 years per query. Unregistered users may request up to 10 years per query.
 
How do I request net and percent changes in a signature?
You can request net and percent changes with any API Version 2.0 POST request. Net and percent calculations are available for one, three, six, and twelve month(s) for certain series. To request calculations, simply add "calculations":true to the signature. Visit the API Signatures page for more information.
Net and percent changes are not available via API Version 1.0.
 
Will my JSON response include metadata?
API Version 2.0 does return series descriptive information. You can register for Version 2.0 at https://data.bls.gov/registrationEngine/.
At this time, version 1.0 of the BLS Public Data API only returns raw data from BLS surveys; it does not include metadata.
 
If you have not formatted your series ID or your request correctly, you may receive an error message. For example:

1
{"status":"REQUEST_SUCCEEDED","responseTime":104,"message":["Invalid Series for Series  laucn21219003!"], "Results":[{"series": [{"seriesID":"laucn21219003!","data":[]}] }]}     

We have provided solutions for some of the most common error messages.

I received a "Series does not exist" error. What does this mean?
Please check to make sure that you typed your series ID in the correct format. Your series ID must include all capital letters and must not have any special characters.
 
I received a "Database is locked for Series" error. What does this mean?
The data you requested is currently not available.
 
I received a "No Data Available for Series" error. What does this mean?
You have requested data for a year that is not in our database. Please adjust your request.
 
How do I format the year for my request?
If you would like to specify a time frame in your request, you must include a startyear and an endyear within the request. Each four-digit year should be formatted in numeric characters –YYYY (e.g. "2013", not "aaaa" or "13"). Your request must not exceed a 10 year period.
 
I received a "415 Unsupported Media Type" error. What does this mean?
If you are sending a JSON request, you must set your HTTP Content-Type to "application/json". You can do this using our sample code.
 
I received an HTTP status/response code with my request. What does the code mean?
200: Your request was successful.
202: Your request is processing.
400: Your request did not follow the correct syntax.
401: You're not authorized to make this request.
404: Your request was not found and/or does not exist.
429: You have made too many requests.
500: The server has encountered an unexpected condition, and the request cannot be completed.
 
My request won't return "catalog" data. What happened?
Catalog data is only available for a select number of surveys. The available surveys can be found in the BLS Data Finder tool.
I received an 'Unknown SSL protocol error in connection to api.bls.gov:443'.
The Bureau of Labor Statistics (BLS) stopped supporting Transport Layer Security (TLS) 1.0 effective October 1, 2018. Users must interact with BLS websites using TLS 1.1 and higher (preferably TLS 1.2 and higher). Users may have to update or configure their client libraries and browsers.

Transport Layer Security (TLS) is an internet protocol that ensures secure communications. It’s the most common security protocol used for web browsers and other applications that require data to be securely exchanged over a network. TLS ensures that a connection to a remote endpoint is the intended endpoint through encryption and endpoint identity verification. TLS 1.0 has vulnerabilities.

I received a "429 Too Many Requests" error. What does this mean?
You have exceeded our limit on the number of queries that can be executed within a specific period of time. Please refer to our query limits for further information.

I don't have sample code for my language.
We have provided examples of sample code for the most common languages, including Java, PHP, Python, R, Ruby/Ruby on Rails, SAS, and Unix Command Line.
 
Didn't see your question? Please send us your feedback. We look forward to hearing from you.

 

Last Modified Date: August 30, 2023