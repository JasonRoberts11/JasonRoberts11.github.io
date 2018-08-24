/**
 * 
 */
package main;

import java.awt.Color;
import java.awt.Frame;

import javax.swing.JFrame;

public class Popup {

	public static void main(String[] args) {
		Popup p = new Popup();
	}
	public Popup() {
		CreateBF(600,600);
	}
	public BasicFrame CreateBF(int x,int y) {
		BasicFrame g = new BasicFrame(x,y,this);
		return g;
	}
}
