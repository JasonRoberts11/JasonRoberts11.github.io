//access iterators and scanner
import java.util.Iterator;
//import java.util.Scanner;
public class Hundered {
	public static void main (String[] args) {
		new Iterator<Integer>(){
			private int i = 0;
			
			@Override
			
			public Integer next(){
				return ++i;
			}
			
			@Override
			public boolean hasNext(){
				return i < 100;
			}
		}.forEachRemaining(System.out::println);
	}
}