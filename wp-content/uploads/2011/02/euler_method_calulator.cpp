/*	***************************
	EULER METHOD CALCULATOR
    by Evan Hahn (evanhahn.com)
	***************************
	
	This will use the Euler method to estimate values of a differential
	equation.
	
	Code licensed under a CC-BY 3.0 license:
	http://creativecommons.org/licenses/by/3.0/	*/

/*	====================
	CHANGE THESE VALUES!
	====================	*/

#define X_INITIAL 0.0	// What's the initial X?
#define Y_INITIAL 5.0	// What's the initial Y?
#define STEP_SIZE 0.25	// How big are the steps?
#define X_END 2.0	// How far should I go?
#define DY_DX(x,y) (x / y)	// dy/dx = ...?

/*	====================================
	DON'T MESS WITH CODE BELOW THIS LINE
	   unless you are very very brave
	====================================	*/

#include <iostream>
using namespace std;

int main() {
	
	// Set initial values
	double x = X_INITIAL, y = Y_INITIAL, delta_y = 0;
	
	// Output table
	cout << "x\ty" << endl << endl;
	while (x < (STEP_SIZE + X_END)) {
		cout << x << "\t" << y << endl;
		delta_y = DY_DX(x,y) * STEP_SIZE;
		y += delta_y;
		x += STEP_SIZE;
	}
	
	// We're all done!
	return 0;	
	
}