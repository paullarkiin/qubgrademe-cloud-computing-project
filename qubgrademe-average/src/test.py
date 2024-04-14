import unittest
import average
from app import app


class test_average_func(unittest.TestCase):
    def test_average(self):
       self.assertEqual(average.avg(10,20,45,5,1),16)


class test_response(unittest.TestCase):

    def setUp(self):
        self.app = app.test_client()

    def tearDown(self):
        pass

    def test_with_valid_values(self):
        response = self.app.get('/?mark_1=20&mark_2=30&mark_3=23&mark_4=20&mark_5=65&module_1=a&module_2=b&module_3=c&module_4=d&module_5=e')
        self.assertEqual(response.status_code, 200)

    def test_with_no_values(self):
        response = self.app.get("/")
        self.assertEqual(response.status_code, 400)

    def test_if_missing_value(self):
        response = self.app.get('/?mark_1=&mark_2=30&mark_3=23&mark_4=20&mark_5=65&module_1=a&module_2=b&module_3=c&module_4=d&module_5=e')
        self.assertEqual(response.status_code, 400)

    def test_if_mark_is_letters(self):
        response = self.app.get('/?mark_1="d"&mark_2=30&mark_3=23&mark_4=20&mark_5=65&module_1=a&&module_2=b&module_3=c&module_4=d&module_5=e')
        self.assertEqual(response.status_code, 400)

        
if __name__ == '__main__':
    unittest.main()


