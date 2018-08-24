package voxeltest;

import java.awt.AWTException;
import java.awt.GraphicsDevice;
import java.awt.GraphicsEnvironment;
import java.awt.MouseInfo;
import java.awt.Robot;
import java.util.HashMap;
import java.util.Hashtable;
import java.util.Map;
import java.util.Map.Entry;

import Graphicstest.ImageReader;
import Graphicstest.Vector3;

public class VoxEn {
	Vector3 campos;
	int mx = 0;
	int my = 0;
	float rx = 0;
	float ry = 0;
	float fovc = 0.02f;
	int viewdist=3000;
	int density = 0;
	int siz = 1;
	HashMap<Float,Vector3> hmm = new HashMap<Float,Vector3>();
	Vector3 sel = new Vector3(0,0,0);
	String seld = "";
	ImageReader[] imgas = new ImageReader[7];
	ImageReader selecc = new ImageReader("src/voxeltest/select.png");
	byte[][] blkrndr = {
				{0,0,0,0,0,0},
				{0,2,1,1,1,1},
				{3,3,3,3,3,3},
				{4,4,4,4,4,4},
				{6,6,5,5,5,5}};
	VoxChunk[][][] Chnks = new VoxChunk[3][3][3];
	byte[][][] airs = new byte[Chnks.length][Chnks[0].length][Chnks[0][0].length];
	byte[][][] Voxels = new byte[10][10][30];
	public VoxEn(Vector3 vcam) {
		campos=vcam;
		resetCloud(1,4);
		resetChunks(1,4);
		//getimages
		//resetHills(1, 4);
		for(int i = 0;i<imgas.length;i++) {
			imgas[i] = new ImageReader("src/voxeltest/img"+i+".png");
		}
	}
	////UPDATES THE AIRS ARRAY FOR THE STUFFS
	public void UpdateAirs() {
		for(int x = 0; x < airs.length; x++) {
			for(int y = 0; y < airs[0].length; y++) {
				for(int z = 0; z < airs[0][0].length; z++) {
					if(Chnks[x][y][z].isair) {
					airs[x][y][z]=1;
					}else{
						airs[x][y][z]=0;
					}
				}
			}
		}
	}
	public int GetPix(int x, int y) {
		int blue = 0;
		int green=0;
		int red = 0;
		int pix = 0;
		int val2=0;
		int xx=(int)campos.x/16;
		int yy=(int)campos.y/16;
		int zz=(int)campos.z/16;
		if(xx>airs.length-1)
			xx=airs.length-1;
		if(xx<0)
			xx=0;
		if(yy>airs[0].length-1)
			yy=airs[0].length-1;
		if(yy<0)
			yy=0;
		if(zz>airs[0][0].length-1)
			zz=airs[0][0].length-1;
		if(zz<0)
			zz=0;
		int b2 = 0;
		byte bright=127;
		String side= "none";
		float mag = viewdist;
		Vector3 ve = new Vector3(0,0,-viewdist).rotate(Math.sqrt(x*x+y*y)*fovc,"x").rotate(Math.atan2(y, x), "z");
		ve = ve.rotate(ry, "y").rotate(rx, "z");
		float[] findub = new float[7];
		
		
		Voxels = null;
		Voxels = Chnks[xx][yy][zz].StorChunk;
		String[] str = GetSquare(Voxels,Vector3.add(ve, (new Vector3(xx*-16,yy*-16,zz*-16))),Vector3.add(campos, (new Vector3(xx*-16,yy*-16,zz*-16))),false);
		findub[0] = Float.parseFloat(str[0]);
		findub[1] = Float.parseFloat(str[1]);
		findub[2] = Float.parseFloat(str[2]);
		val2= Integer.parseInt(str[4]);
		side = str[3];
		if(side=="none") {
			red=255;
			String[] str2 = GetSquare(airs, Vector3.scalmultiply(ve, (float)(1.0/16)),Vector3.scalmultiply(campos, (float)(1.0/16)),true);
		for(Entry<Float, Vector3> flt :hmm.entrySet()) {
			b2-=50;
			xx=(int) flt.getValue().x;
			yy=(int) flt.getValue().y;
			zz=(int) flt.getValue().z;
			//blue=(int)flt.getValue().x*50;
			//green=(int)flt.getValue().y*50;
			//red=(int)flt.getValue().z*50;
			//System.out.print((flt.getValue().z+" + "+(flt.getKey())+""));
		}
		}
		//System.out.println("");
		Voxels = null;
		Voxels = Chnks[xx][yy][zz].StorChunk;
		String[] str3 = GetSquare(Voxels,Vector3.add(ve, (new Vector3(xx*-16,yy*-16,zz*-16))),Vector3.add(campos, (new Vector3(xx*-16,yy*-16,zz*-16))),false);
		findub[0] = Float.parseFloat(str[0]);
		findub[1] = Float.parseFloat(str[1]);
		findub[2] = Float.parseFloat(str[2]);
		val2= Integer.parseInt(str[4]);
		side = str[3];
		if(x==0&&y==0) {
			sel.x=(int)findub[0]+16*xx;
			sel.y=(int)findub[1]+16*yy;
			sel.z=(int)findub[2]+16*zz;
			seld=side;
		}
		if(side=="x1") {
			bright=87;
			int[][] tdata = imgas[blkrndr[val2-1][4]].imagedat;
			pix = tdata[(int)Math.ceil(tdata.length*(1-findub[1]%1))-1][(int)Math.ceil(tdata[0].length*(1-findub[2]%1))-1];
		}
		if(side=="x2") {
			bright=87;
			int[][] tdata = imgas[blkrndr[val2-1][5]].imagedat;
			pix = tdata[(int)(tdata.length*(findub[1]%1))][(int)Math.ceil(tdata[0].length*(1-findub[2]%1))-1];
		}
		if(side=="y1") {
			bright=107;
			int[][] tdata = imgas[blkrndr[val2-1][2]].imagedat;
			pix = tdata[(int)(tdata.length*(findub[0]%1))][(int)Math.ceil(tdata[0].length*(1-findub[2]%1))-1];
		}
		if(side=="y2") {
			bright=107;
			int[][] tdata = imgas[blkrndr[val2-1][3]].imagedat;
			pix = tdata[(int)(tdata.length*(findub[0]%1))][(int)Math.ceil(tdata[0].length*(1-findub[2]%1))-1];
		}
		if(side=="z1") {
			bright=127;
			int[][] tdata = imgas[blkrndr[val2-1][0]].imagedat;
			pix = tdata[(int)(tdata.length*(findub[0]%1))][(int)(tdata[0].length*(findub[1]%1))];
		}
		if(side=="z2") {
			bright=127;
			int[][] tdata = imgas[blkrndr[val2-1][1]].imagedat;
			pix = tdata[(int)(tdata.length*(findub[0]%1))][(int)(tdata[0].length*(findub[1]%1))];
		}
		if(sel.x==(int)findub[0]+xx*16&&sel.y==(int)findub[1]+yy*16&&sel.z==(int)findub[2]+zz*16) {
			if(seld == side) {
				int[][] tdata = selecc.imagedat;
				int dod=0;
				if(seld == "x1"||seld == "x2") 
				dod = tdata[(int)(tdata.length*(findub[1]%1))][(int)(tdata[0].length*(findub[2]%1))];
				if(seld == "y1"||seld == "y2") 
					dod = tdata[(int)(tdata.length*(findub[0]%1))][(int)(tdata[0].length*(findub[2]%1))];
				if(seld == "z1"||seld == "z2") 
					dod = tdata[(int)(tdata.length*(findub[0]%1))][(int)(tdata[0].length*(findub[1]%1))];
						
				if (dod!=0){
					//System.out.print(dod+" ");
					pix = dod;
				}
			}
		}
		if (pix==0) {
			pix = (red << 16) | (green << 8) | blue;
		}
		bright +=b2;
		red = (pix >> 16) & 0xFF;
		green = (pix >> 8) & 0xFF;
		blue = pix & 0xFF;
		red = red*(bright+127)/256;
		green = green*(bright+127)/256;
		blue = blue*(bright+127)/256;
		pix = (red << 16) | (green << 8) | blue;
		return pix;
	}
	public String[] GetSquare(byte[][][] Box, Vector3 ve,Vector3 campos,boolean sethm) {
		HashMap<Float,Vector3> ht = new HashMap<Float,Vector3>();
		byte[][][] Voxels = Box;
		int zlen = Voxels[0][0].length;
		int ylen = Voxels[0].length;
		int xlen = Voxels.length;
		float mag = 3000;
		float[] findub = new float[7];
		int val;
		int val2=0;
		int zstrt = (int)campos.z;
		String side="none";
		if(zstrt < 0) {
			zstrt=0;
		}
		for(int z = zstrt;z<zlen;z++) {
		Vector3 v3 = Vector3.add(campos, new Vector3(0,0,-z));
		if((v3.z<0&&Vector3.add(v3, ve).z>0)) {
		float[] doi =Vector3.intersection(v3, Vector3.add(v3, ve), "z");
		if(0<doi[0]&&doi[0]<xlen&&0<doi[1]&&doi[1]<ylen) {
			val= Voxels[(int)doi[0]][(int)doi[1]][z];
			
			if(val>0) {
				float tmpmag = Vector3.subtract(new Vector3(doi[0],doi[1],doi[2]), v3).magnitude();
				if(mag>tmpmag) {
					findub = doi;
					findub[2]=z;
					side = "z1";
					val2=val;
					if(sethm) {
						Vector3 v4=new Vector3((int)findub[0],(int)findub[1],(int)findub[2]);
						if(!ht.containsValue(v4))
						ht.put(tmpmag, v4);
					}else {
						z=zlen;
						mag=tmpmag;
					}
				}
				}
			}
		
		}
		}
		zstrt = (int)campos.z;
		if(zstrt > zlen) {
			zstrt=zlen;
		}
		
		for(int z = zstrt-1;z>=0;z--) {
			Vector3 v3 = Vector3.add(campos, new Vector3(0,0,-1-z));
			if((v3.z>0&&Vector3.add(v3, ve).z<0)) {
			float[] doi =Vector3.intersection(v3, Vector3.add(v3, ve), "z");
			if(0<doi[0]&&doi[0]<xlen&&0<doi[1]&&doi[1]<ylen) {
				val= Voxels[(int)doi[0]][(int)doi[1]][z];
				
				if(val>0) {
					float tmpmag = Vector3.subtract(new Vector3(doi[0],doi[1],doi[2]), v3).magnitude();
					if(mag>tmpmag) {
						findub = doi;
						findub[2]=z;
						side = "z2";
						val2=val;
						if(sethm) {
							Vector3 v4=new Vector3((int)findub[0],(int)findub[1],(int)findub[2]);
							if(!ht.containsValue(v4))
							ht.put(tmpmag, v4);
						}else {
							z=-1;
							mag=tmpmag;
						}
					}
					
					}
				}
			
			}
			}
		zstrt = (int)campos.y;
		if(zstrt <0) {
			zstrt=0;
		}
		for(int yy = zstrt;yy<ylen;yy++) {
			Vector3 v3 = Vector3.add(campos, new Vector3(0,-yy,0));
			if((v3.y<0&&Vector3.add(v3, ve).y>0)) {
			float[] doi =Vector3.intersection(v3, Vector3.add(v3, ve), "y");
			if(0<doi[0]&&doi[0]<xlen&&0<doi[2]&&doi[2]<zlen) {
				val= Voxels[(int)doi[0]][yy][(int)doi[2]];
				
				if(val>0) {
					float tmpmag = Vector3.subtract(new Vector3(doi[0],doi[1],doi[2]), v3).magnitude();
					if(mag>tmpmag) {
						findub = doi;
						findub[1]=yy;
						side = "y1";
						val2=val;
						if(sethm) {
							Vector3 v4=new Vector3((int)findub[0],(int)findub[1],(int)findub[2]);
							if(!ht.containsValue(v4))
							ht.put(tmpmag, v4);
						}else {
							yy=ylen;
							mag=tmpmag;
						}
					}
					}
				}
			}
			}
		zstrt = (int)campos.y;
		if(zstrt > ylen) {
			zstrt=ylen;
		}
		for(int yy = zstrt-1;yy>=0;yy--) {
			Vector3 v3 = Vector3.add(campos, new Vector3(0,-1-yy,0));
			if((v3.y>0&&Vector3.add(v3, ve).y<0)) {
			float[] doi =Vector3.intersection(v3, Vector3.add(v3, ve), "y");
			if(0<doi[0]&&doi[0]<xlen&&0<doi[2]&&doi[2]<zlen) {
				val= Voxels[(int)doi[0]][yy][(int)doi[2]];
				
				if(val>0) {
					float tmpmag = Vector3.subtract(new Vector3(doi[0],doi[1],doi[2]), v3).magnitude();
					if(mag>tmpmag) {
						findub = doi;
						findub[1]=yy;
						side = "y2";
						val2=val;
						if(sethm) {
							Vector3 v4=new Vector3((int)findub[0],(int)findub[1],(int)findub[2]);
							if(!ht.containsValue(v4))
							ht.put(tmpmag, v4);
						}else {
							yy=-1;
							mag=tmpmag;
						}
					}
					}
				}
			}
			}
		zstrt = (int)campos.x;
		if(zstrt <0) {
			zstrt=0;
		}
		for(int xx = zstrt;xx<xlen;xx++) {
			Vector3 v3 = Vector3.add(campos, new Vector3(-xx,0,0));
			if((v3.x<0&&Vector3.add(v3, ve).x>0)) {
			float[] doi =Vector3.intersection(v3, Vector3.add(v3, ve), "x");
			if(0<doi[1]&&doi[1]<ylen&&0<doi[2]&&doi[2]<zlen) {
				val= Voxels[xx][(int)doi[1]][(int)doi[2]];
				
				if(val>0) {
					float tmpmag = Vector3.subtract(new Vector3(doi[0],doi[1],doi[2]), v3).magnitude();
					if(mag>tmpmag) {
						findub = doi;
						findub[0]=xx;
						side = "x1";
						val2=val;
						if(sethm) {
							Vector3 v4=new Vector3((int)findub[0],(int)findub[1],(int)findub[2]);
							if(!ht.containsValue(v4))
							ht.put(tmpmag, v4);
						}else {
							xx=xlen;
							mag=tmpmag;
						}
					}
					}
				}
			}
			}
		zstrt = (int)campos.x;
		if(zstrt > xlen) {
			zstrt=xlen;
		}
		for(int xx = zstrt-1;xx>=0;xx--) {
			Vector3 v3 = Vector3.add(campos, new Vector3(-1-xx,0,0));
			if((v3.x>0&&Vector3.add(v3, ve).x<0)) {
			float[] doi =Vector3.intersection(v3, Vector3.add(v3, ve), "x");
			if(0<doi[1]&&doi[1]<ylen&&0<doi[2]&&doi[2]<zlen) {
				val= Voxels[xx][(int)doi[1]][(int)doi[2]];
				
				if(val>0) {
					float tmpmag = Vector3.subtract(new Vector3(doi[0],doi[1],doi[2]), v3).magnitude();
					if(mag>tmpmag) {
						findub = doi;
						findub[0]=xx;
						side = "x2";
						val2=val;
						if(sethm) {
							Vector3 v4=new Vector3((int)findub[0],(int)findub[1],(int)findub[2]);
							if(!ht.containsValue(v4))
							ht.put(tmpmag, v4);
						}else {
							xx=-1;
							mag=tmpmag;
						}
					}
					}
				}
			}
			}
		String[] bob = {""+findub[0],""+findub[1],""+findub[2],side,""+val2,""+mag}; 
		if(sethm) {
			hmm=ht;
		}
		return bob;
	}
	
	public void RotateCam(float dx, float dy) {
		rx +=dx;
		ry +=dy;
	}
	public void SetCam(float dx, float dy) {
		rx =dx;
		ry =dy;
	}
	public boolean MoveCam(Vector3 v3) {
		if(Inside(Vector3.add(v3, campos))<1) {
		campos=Vector3.add(campos, v3);
		return true;
		}else {
			return false;
		}
		
		
	}
	public void SetMouse(int xx,int yy) {
		mx = xx;
		my = yy;
	}
	public void MouseCam() {
		try {
			//GraphicsDevice device = GraphicsEnvironment.getLocalGraphicsEnvironment().getDefaultScreenDevice();
			Robot r = new Robot();
			//Robot s = new Robot();
			rx+=(mx-MouseInfo.getPointerInfo().getLocation().x)*-0.01;
			ry+=(my-MouseInfo.getPointerInfo().getLocation().y)*0.01;
			if(ry<0) {
				ry = 0;
			}
			if(ry>3.1415) {
				ry = 3.1415f;
			}
			r.mouseMove(mx, my);
		} catch (AWTException e) {
			e.printStackTrace();
		}
	}
	public byte Inside(Vector3 v3) {
		if(0<v3.x&&v3.x<Chnks.length*16&&0<v3.y&&v3.y<Chnks[0].length*16&&0<v3.z&&v3.z<Chnks[0][0].length*16) {
		//System.out.println(Voxels[(int)v3.x][(int)v3.y][(int)v3.z]+"  "+(int)v3.x);
			return Chnks[(int)v3.x/16][(int)v3.y/16][(int)v3.z/16].StorChunk[(int)v3.x%16][(int)v3.y%16][(int)v3.z%16];
		
		}else {
		return -128;
		} 
	}
	public void setBlock(int block) {
		Vector3 v3 = sel;
		Chnks[(int)v3.x/16][(int)v3.y/16][(int)v3.z/16].StorChunk[(int)v3.x%16][(int)v3.y%16][(int)v3.z%16] = (byte)block;
	}
	public void setBlockOut(int block) {
		int dx=0;
		int dy=0;
		int dz=0;
		try {
		if(seld=="x1")
			dx=-1;
		if(seld=="x2")
			dx=1;
		if(seld=="y1")
			dy=-1;
		if(seld=="y2")
			dy=1;
		if(seld=="z1")
			dz=-1;
		if(seld=="z2")
			dz=1;
		if(!((int)sel.x+dx==(int)campos.x&&(int)sel.z+dz==(int)campos.z&&(int)sel.y+dy==(int)campos.y)) {
			Vector3 v3 = Vector3.add(sel, new Vector3(dx,dy,dz));
		Chnks[(int)v3.x/16][(int)v3.y/16][(int)v3.z/16].StorChunk[(int)v3.x%16][(int)v3.y%16][(int)v3.z%16] = (byte)block;
		}
		}catch(ArrayIndexOutOfBoundsException e) {
			
		}
	}
	public void resetCloud(float weight, int count){
		
		
		byte[][][] tmp = new byte[Voxels.length][Voxels[0].length][Voxels[0][0].length];
		for(int x = 0; x < Voxels.length; x++) {
			for(int y = 0; y < Voxels[0].length; y++) {
				for(int z = 0; z < Voxels[0][0].length; z++) {
					Voxels[x][y][z]=(byte) (Math.random()*256-128);
				}
			}
			//System.out.println("Done with plane "+x);
		}
		for(int i = 0; i< count; i++) {
		for(int x = 1; x < Voxels.length-1; x++) {
			for(int y = 1; y < Voxels[0].length-1; y++) {
				for(int z = 1; z < Voxels[0][0].length-1; z++) {
					int sum = 0;
					sum+=Voxels[x+1][y][z];
					sum+=Voxels[x-1][y][z];
					sum+=Voxels[x][y+1][z];
					sum+=Voxels[x][y-1][z];
					sum+=Voxels[x][y][z+1];
					sum+=Voxels[x][y][z-1];
					tmp[x][y][z]=(byte) (Voxels[x][y][z]*(1-(weight*6/7))+(sum*weight/7));
				}
			}
			//System.out.println("Done avging plane "+x);
		}
		for(int x = 1; x < Voxels.length-1; x++) {
			for(int y = 1; y < Voxels[0].length-1; y++) {
				for(int z = 1; z < Voxels[0][0].length-1; z++) {
					Voxels[x][y][z]=tmp[x][y][z];
				}
			}
		}
		}
		for(int x = 0; x < Voxels.length; x++) {
			for(int y = 0; y < Voxels[0].length; y++) {
				for(int z = 0; z < Voxels[0][0].length; z++) {
					if(Voxels[x][y][z]>density) {
						Voxels[x][y][z]=(byte) (Math.random()*5+1);
					}else {
						Voxels[x][y][z]=0;
					}
				}
			}
			//System.out.println("Done with plane "+x);
		}
		//Voxels= tmp;
		System.out.println("Done With Cloud");
	}
	public void resetChunks(int a, int b) {
		for(int x = 0; x < Chnks.length; x++) {
			for(int y = 0; y < Chnks[0].length; y++) {
				for(int z = 0; z < Chnks[0][0].length; z++) {
						Chnks[x][y][z] = new VoxChunk(new byte[16][16][16]);
						for(int xx = 0; xx < 16; xx++) {
							for(int yy = 0; yy < 16; yy++) {
								for(int zz = 0; zz < 16; zz++) {
									Chnks[x][y][z].StorChunk[xx][yy][zz] = (byte) (Math.random()*5);
								}
							}
						}
						Chnks[x][y][z].Setisair(true);
				}
			}
		}
	}
public void resetHills(float weight, int count){
		
		
		byte[][] tmp = new byte[Voxels.length][Voxels[0].length];
		byte[][] tmp2 = new byte[tmp.length][tmp[0].length];
		for(int x = 0; x < tmp.length; x++) {
			for(int y = 0; y < tmp[0].length; y++) {
					tmp[x][y]=(byte) (Math.random()*256-128);
			}
			//System.out.println("Done with plane "+x);
		}
		for(int i = 0; i< count; i++) {
		for(int x = 1; x < tmp.length-1; x++) {
			for(int y = 1; y < tmp[0].length-1; y++) {
					int sum = 0;
					sum+=tmp[x+1][y];
					sum+=tmp[x-1][y];
					sum+=tmp[x][y+1];
					sum+=tmp[x][y-1];
					tmp2[x][y]=(byte) (tmp[x][y]*(1-(weight*6/7))+(sum*weight/7));
			}
			//System.out.println("Done avging plane "+x);
		}
		for(int x = 1; x < tmp.length-1; x++) {
			for(int y = 1; y < tmp[0].length-1; y++) {
					tmp[x][y]=tmp2[x][y];
			}
		}
		}
		for(int x = 0; x < Voxels.length; x++) {
			for(int y = 0; y < Voxels[0].length; y++) {
				int height = tmp[x][y];
				if(height >= Voxels[0][0].length)
					height= Voxels[0][0].length-1;
				if(height <0)
					height=0;
				for(int z = 0; z < Voxels[0][0].length; z++) {
					if(z<height/2+Voxels[0][0].length/2) {
						Voxels[x][y][z]=(byte) (3);
					}else if(z-5<height/2+Voxels[0][0].length/2){
						Voxels[x][y][z]=(byte) (1);
					} else if(z-6<height/2+Voxels[0][0].length/2){
						Voxels[x][y][z]=(byte) (2);
					}else{
						Voxels[x][y][z]=0;
					}
				}
			}
			//System.out.println("Done with plane "+x);
		}
		//Voxels= tmp;

		System.out.println("Done With Hills");
		
		
		
		
		
	}
}
