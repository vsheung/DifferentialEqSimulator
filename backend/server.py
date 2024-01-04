from flask import Flask, request
import math

class CaseStudyApp(Flask):

    """
    A class to represent the calculations for the case study
    ...

    Methods
    -------
    getResults():
        API endpoint that performs the simulations for 20 steps
    
    getValuesFromDictionary(dictionary):
        Helper function that returns inputs (x0, sigma, rho, etc) from dictionary
        
    performCalculations():
        Helper function that returns calculated values based on values provided
    """

    def __init__(self):
        super().__init__(__name__)
        self.add_url_rule("/getResults", "getResults", self.getResults)

    def getResults(self):
        """
        API call that performs simulations based on inputs provided in request

        Returns
        -------
        list of object: Returned array of 20 objects representing simulated system for 20 timesteps

        Raises
        ------
        NotImplementedError
            If no sound is set for the animal or passed in as a
            parameter.
        """
        result = []
        try:
            dictionary = request.args.to_dict(flat=False)
            self.x, self.y, self.z, self.sigma, self.rho, self.beta, self.delta = self.getInputsFromDictionary(dictionary)
            for i in range (1, 21):
                data = {}
                newX, newY, newZ = self.performCalculations()
                data['n'], data['x'], data['y'], data['z'] = i, str(newX), str(newY), str(newZ)
                result.append(data)
                self.x, self.y, self.z = newX, newY, newZ
        except Exception as e:
            raise e
        
        return result

    def getInputsFromDictionary(self, dictionary):
        """
        Helper function finds corresponding dictionary values for given dictionary keys

        Parameters
        ----------    
        keys(tuple of str): Dictionary keys to parse values from
        
        Returns
        -------    
        list of float: Returned array of floats that represent values of given keys
        """
        keys = ['x', 'y', 'z','sigma', 'rho', 'beta', 'delta']
        inputValueArray = []
        for key in keys:
            if key in dictionary:
                inputValueArray.append(float(dictionary[key][0])) ## Converting dictionary values to float for calculations
            else:
                inputValueArray.append(0.0)
        return inputValueArray
    
    def performCalculations(self):
        """
        Helper function that calculates new values of x, y and z given previous values
        
        Returns
        -------    
        list of float: Returned array of floats that represent new calculated values of x, y and z
        """
        if math.isinf(self.x) or math.isinf(self.y) or math.isinf(self.z) :
            newX = self.x
            newY = self.y
            newZ = self.z
        else:
            newX = self.x + self.z * self.sigma * (self.y - self.x) * self.delta
            newY = self.y + (self.x * (self.rho - self.z) - (self.z * self.y)) * self.delta
            newZ = self.z + (self.x * self.y - self.beta * self.z) * self.delta

        return [newX, newY, newZ]

app = CaseStudyApp()
if __name__ == "__main__":
    app.run(debug=True)
