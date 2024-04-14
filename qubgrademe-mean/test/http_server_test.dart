import 'dart:io';
import '../bin/server.dart';
import 'package:test/test.dart';

void main() {
  HttpServer server;
  setUp(() async {
    server = await createServer();
    handleRequests(server);
  });

  test('test_http_setup', () async {
    final client = HttpClient();
    final request =
        await client.get(InternetAddress.loopbackIPv4.host, 80, '/');
    final response = await request.close();

    assert(response.statusCode == 200);
    print(response);
  });
}
