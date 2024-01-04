import unittest
from server import CaseStudyApp

class TestCaseStudyApp(unittest.TestCase):

    def setUp(self):
        # Create an instance of CaseStudyApp
        self.app_instance = CaseStudyApp()

    def test_getResults(self):
        
        print("getResults Test 1: Check the response for valid input parameters, should give proper result response with 20 values")
        with self.app_instance.test_request_context(query_string={'x': '1.0', 'y': '2.0', 'z': '3.0', 'sigma': '0.5', 'rho': '0.3', 'beta': '0.7', 'delta': '0.1'}):
            response = self.app_instance.getResults()
            self.assertEqual(len(response), 20)
        

        print("getResults Test 2: Check the response for missing input parameters, should give proper result response with 20 values")
        with self.app_instance.test_request_context(query_string={'x': '0.0', 'z': '0.0', 'sigma': '0.0', 'rho': '0.0', 'beta': '0.0', 'delta': '0.0'}):
            response = self.app_instance.getResults()
            self.assertEqual(len(response), 20)
            self.assertEqual(self.app_instance.y, 0.0)

        print("getResults Test 3: Throw ValueError for invalid parameter values (non-float)")
        with self.app_instance.test_request_context(query_string={'x': 'test', 'y': '2.0', 'z': 'test', 'sigma': '0.5', 'rho': '0.3', 'beta': '0.7', 'delta': '0.1'}):
            with self.assertRaises(ValueError):
                response = self.app_instance.getResults()

        print("getResults Test 4: Check the response for special cases (if any parameter is infinity), should have normal behavior")
        with self.app_instance.test_request_context(query_string={'x': 'inf', 'y': '2.0', 'z': '2.0', 'sigma': '0.5', 'rho': '0.3', 'beta': '0.7', 'delta': '0.1'}):
            response = self.app_instance.getResults()
            self.assertEqual(len(response), 20)
            self.assertEqual([self.app_instance.x,self.app_instance.y,self.app_instance.z] , [float('inf'), 2.0, 2.0])

    def test_getInputsFromDictionary(self):

        print("getInputsFromDictionary Test 1: Check the response for all keys that have existing corresponding entries, should yield correct response")
        dictionary = {'x': ['1.0'], 'y': ['2.0'], 'z': ['3.0'], 'sigma': ['3.0'], 'rho': ['3.0'], 'beta': ['3.0'], 'delta': ['3.0']}
        result = self.app_instance.getInputsFromDictionary(dictionary)
        expected_result = [1.0, 2.0, 3.0, 3.0, 3.0, 3.0, 3.0]
        self.assertEqual(result, expected_result)

        print("getInputsFromDictionary Test 2: Check the response for key that does not exist in dictionary, defaults to 0.0")
        dictionary = {'x': ['1.0'], 'y': ['2.0'], 'z': ['3.0']}
        result = self.app_instance.getInputsFromDictionary(dictionary)
        expected_result = [1.0, 2.0, 3.0, 0.0, 0.0, 0.0, 0.0]
        self.assertEqual(result, expected_result)

        print("getInputsFromDictionary Test 3: Check the response for dictionary value with improper value, should throw ValueError")
        dictionary = {'x': ['1.0'], 'y': ['2.0'], 'z': ['test']}
        with self.assertRaises(ValueError):
            result = self.app_instance.getInputsFromDictionary(dictionary)


    def test_performCalculations(self):

        print("performCalculations Test 1: Check the response for valid given inputs")
        self.app_instance.x, self.app_instance.y, self.app_instance.z, self.app_instance.sigma, self.app_instance.rho, self.app_instance.beta, self.app_instance.delta = 1.18, -0.61, 3.42, 0.2, 0.3, 0.2, 0.3
        result = self.app_instance.performCalculations()
        self.assertIsInstance(result, list)
        self.assertEqual(len(result), 3)
        self.assertEqual(0.81269, round(result[0], 5))
        self.assertEqual(-1.08862, round(result[1], 5))
        self.assertEqual(2.99886, round(result[2], 5))

        print("performCalculations Test 2: Response for x, y and/or z with infinity input values should be same as original values ")
        self.app_instance.x, self.app_instance.y, self.app_instance.z, self.app_instance.sigma, self.app_instance.rho, self.app_instance.beta, self.app_instance.delta = float("inf"), -0.61, 3.42, 0.2, 0.3, 0.2, 0.3
        result = self.app_instance.performCalculations()
        self.assertIsInstance(result, list)
        self.assertEqual(len(result), 3)
        self.assertEqual(result, [float("inf"), -0.61, 3.42])


        print("performCalculations Test 3: Response for x, y and/or z with improper input values, should raise TypeError")
        self.app_instance.x, self.app_instance.y, self.app_instance.z, self.app_instance.sigma, self.app_instance.rho, self.app_instance.beta, self.app_instance.delta = None, "test", 3, 0.2, 0.3, 0.2, 0.3
        with self.assertRaises(TypeError):
            result = self.app_instance.performCalculations()

    def main(self):
        self.setUp()
        print("\n")

        print("***Running Test Suite for API call getResults***\n")
        self.test_getResults()
        print("\n")

        print("***Running Test Suite for helper function getInputsFromDictionary***\n")
        self.test_getInputsFromDictionary()
        print("\n")

        print("***Running Test Suite for helper function performCalculations***\n")
        self.test_performCalculations()
        print("\n")

        print("**ALL TEST SUITES PASSED**\n")

if __name__ == '__main__':
    test_instance = TestCaseStudyApp()
    test_instance.main()
