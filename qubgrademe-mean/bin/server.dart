import 'dart:async';
import 'dart:convert';
import 'dart:io';
import '../lib/mean.dart';

var output = {
  "error": false,
  "func": "mean",
  "errrorMsg": "",
  "modules": "",
  "marks": "",
  "mean": "",
};

var start = DateTime.now().toLocal();

Future<void> main() async {
  final server = await createServer();
  print('Server started: ${server.address} port ${server.port}');
  await handleRequests(server);
}

Future<HttpServer> createServer() async {
  final address = InternetAddress.anyIPv4;
  const port = 80;
  return await HttpServer.bind(address, port);
}

Future<void> handleRequests(HttpServer server) async {
  await for (HttpRequest request in server) {
    switch (request.method) {
      case 'GET':
        handleGet(request);
        break;
      default:
        handleDefault(request);
    }
  }
}

/// GET requests
void handleGet(HttpRequest request) {
  final path = request.uri.path;
  switch (path) {
    case '/':
      handleGetMean(request);
      break;
    case '/monitor':
      handleGetMonitor(request);
      break;
    default:
      handleGetOther(request);
  }
}

void handleGetMean(HttpRequest request) {
  final queryParams = request.uri.queryParameters;
  print(queryParams);

  var mark1 = request.uri.queryParameters["mark_1"];
  var mark2 = request.uri.queryParameters["mark_2"];
  var mark3 = request.uri.queryParameters["mark_3"];
  var mark4 = request.uri.queryParameters["mark_4"];
  var mark5 = request.uri.queryParameters["mark_5"];

  var mod1 = request.uri.queryParameters["module_1"];
  var mod2 = request.uri.queryParameters["module_2"];
  var mod3 = request.uri.queryParameters["module_3"];
  var mod4 = request.uri.queryParameters["module_4"];
  var mod5 = request.uri.queryParameters["module_5"];

  var modules = [mod1, mod2, mod3, mod4, mod5];
  var marks = [mark1, mark2, mark3, mark4, mark5];

  for (int i = 0; i < marks.length; i++) {
    if (marks[i] == null || marks.isEmpty) {
      output["error"] = true;
      output["status"] = "400";
      output["errrorMsg"] = "Query parameters missing please provide values";

      request.response.write(output);
      request.response.close();
      return;
    }
  }

  var meanResult = mean(double.parse(mark1!), double.parse(mark2!),
      double.parse(mark3!), double.parse(mark4!), double.parse(mark5!));

  output['error'] = false;
  output['mean'] = meanResult.toString();
  output['modules'] = modules;
  output['marks'] = marks;
  output['errrorMsg'] = "";

  String str = json.encode(output);

  request.response
    ..statusCode = HttpStatus.ok
    ..headers.set('Access-Control-Allow-Origin', '*')
    ..headers.set('Content-type', 'application/json')
    ..write(str)
    ..close();

  print(output);
}

void handleGetMonitor(HttpRequest request) {
  var reqTime = DateTime.now();
  var difference = reqTime.difference(start);

  var output = {
    "date": DateTime.now().toLocal(),
    "server-health": "OK",
    "uptime": difference
  };

  request.response
    ..statusCode = HttpStatus.ok
    ..write(output)
    ..close();
}

void handleGetOther(HttpRequest request) {
  output['error'] = true;
  request.response
    ..statusCode = HttpStatus.badRequest
    ..headers.set('Access-Control-Allow-Origin', '*')
    ..headers.set('Content-type', 'application/json')
    ..write(output)
    ..close();

  print(output);
}

/// Other HTTP method requests
void handleDefault(HttpRequest request) {
  request.response
    ..statusCode = HttpStatus.methodNotAllowed
    ..headers.set('Access-Control-Allow-Origin', '*')
    ..headers.set('Content-type', 'application/json')
    ..write('Unsupported request: ${request.method}.')
    ..close();
}
