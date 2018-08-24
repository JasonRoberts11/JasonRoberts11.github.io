public class Age {

public static void main(String[] args) {

int d = 40;
switch (d) {
    case 20:
        d += 10; //break;
    case 40:
        d -= 10; //break;
    case 60:
        d *= 10; //break;
    default:
        if (d > 100) {
            d -= 100; break;
        }
}
System.out.println(d);
}
}//http://docs.oracle.com/javase/tutorial/java/nutsandbolts/switch.html
// Assignment - Make a program using the switch statements.
//5 case statements
//Asks for a user imput.
// Checks to see if that user input is valid.  
// If it is not a valid input ask the user enter a number again.
// Keep asking for a number until you get one that matches a case