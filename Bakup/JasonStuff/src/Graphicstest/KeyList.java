package Graphicstest;

import java.awt.event.KeyEvent;
import java.awt.event.KeyListener;

public class KeyList implements KeyListener{
	
	int[] keypre = new int[300];
	public KeyList() {
		
	}

	public void keyPressed(KeyEvent e) {
		int keCode = e.getKeyCode();
	//System.out.println(keCode);
		keypre[keCode] = 1;
	}
	
	public int[] Output() {
		return keypre;
	}
	@Override
	public void keyReleased(KeyEvent e) {
		int keCode = e.getKeyCode();
		keypre[keCode] = 0;
	}

	@Override
	public void keyTyped(KeyEvent e) {
		// TODO Auto-generated method stub
		
	}

}
