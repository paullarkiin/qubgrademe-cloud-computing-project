import 'package:qubgradememean/mean.dart';
import 'package:test/test.dart';

void main() {
  test('test_mean_funcation', () {
    expect(mean(20.0, 30.0, 20.0, 5.0, 10.0), 17.0);
  });
}
