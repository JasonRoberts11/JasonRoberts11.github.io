package Graphicstest;
import java.util.*;
public class Environment3D {
	Vector3 campos;
	float rx = 0;
	float ry = 0;
	float fovc = 0.01f;
	int viewdist = 3000;
	ImageReader[] imgas = new ImageReader[2];
	
	ArrayList<Vector3[]> faces = new ArrayList<Vector3[]>();
	ArrayList<Integer> mats = new ArrayList<Integer>();
	public Environment3D(Vector3 vcam, int xr, int yr) {
	for(int i = 0;i<imgas.length;i++) {
		imgas[i] = new ImageReader("src/Graphicstest/img"+i+".png");
	}	
	campos= vcam;
	}
	public int GetPix(int x,int y) {
		Vector3 ve = new Vector3(0,0,-viewdist).rotate(Math.sqrt(x*x+y*y)*fovc,"x").rotate(Math.atan2(y, x), "z");
		ve = ve.rotate(ry, "y").rotate(rx, "z");
		int blue = 0;
		int green=0;
		int red = 0;
		float[] db = null;
		int mag = viewdist;
		int id = 0;
		for(int i=0; i<faces.size(); i++) {
		float[] dub = Vector3.intersection(campos, Vector3.add(campos, ve), faces.get(i)[0], faces.get(i)[1], faces.get(i)[2]);
		if(dub[6]==1) {
			if(mag>(Vector3.subtract(new Vector3(dub[3],dub[4],dub[5]), campos)).magnitude()) {
				db = dub;	
				mag = (int)(Vector3.subtract(new Vector3(dub[3],dub[4],dub[5]), campos)).magnitude();
				id=i;
			}
		}
		}
		int pix = (red << 16) | (green << 8) | blue;
		if(db!=null&&db[6]==1) {
			red=255;
			pix = (red << 16) | (green << 8) | blue;
			int mater=mats.get(id);
			pix = imgas[mater].imagedat[(int)(db[1]*imgas[mater].imagedat.length)][(int)(db[2]*imgas[mater].imagedat[0].length)];
		}
		
		
		return pix;
	}
	public void AddFace(Vector3 v1, Vector3 v2, Vector3 v3, int mat) {
		Vector3[] v4 = new Vector3[3];
		v4[0]=v1;
		v4[1]=v2;
		v4[2]=v3;
		faces.add(v4);
		mats.add(mat);
	}
	public void ClearFaces() {
		faces.clear();
		mats.clear();
	}
	public void RotateCam(float dx, float dy) {
		rx +=dx;
		ry +=dy;
	}
	public void SetCam(float dx, float dy) {
		rx =dx;
		ry =dy;
	}
	public void MoveCam(Vector3 v3) {
		campos=Vector3.add(campos, v3);
	}
	public void AddCube(float x,float y,float z, float size, int mat) {
		AddFace(new Vector3(x+size,y+size,z+size),new Vector3(x+size,y-size,z+size), new Vector3(x+size,y+size,z-size),mat);
		AddFace(new Vector3(x-size,y+size,z+size),new Vector3(x-size,y-size,z+size), new Vector3(x-size,y+size,z-size),mat);
		AddFace(new Vector3(x+size,y+size,z+size),new Vector3(x-size,y+size,z+size), new Vector3(x+size,y-size,z+size),mat);
		AddFace(new Vector3(x+size,y+size,z-size),new Vector3(x-size,y+size,z-size), new Vector3(x+size,y-size,z-size),mat);
		AddFace(new Vector3(x+size,y+size,z+size),new Vector3(x-size,y+size,z+size), new Vector3(x+size,y+size,z-size),mat);
		AddFace(new Vector3(x+size,y-size,z+size),new Vector3(x-size,y-size,z+size), new Vector3(x+size,y-size,z-size),mat);
	}
}
