package com.ffzx.wechat.utils;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletResponse;

import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.MessageChannel;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import com.alibaba.dubbo.remoting.ExecutionException;
import com.ff.common.web.json.BaseRspJson;
import com.ffzx.commerce.framework.utils.DateUtil;
import com.ffzx.commerce.framework.utils.FTPUtil;
import com.ffzx.commerce.framework.utils.ImageAttribute;
import com.ffzx.commerce.framework.utils.ImageUtil;
import com.ffzx.commerce.framework.utils.StringUtil;
import com.ffzx.commerce.framework.utils.UUIDGenerator;

@Controller
@RequestMapping("/Wechat/file/*")
public class FileUploadUtils {
	
	protected final Logger logger = LoggerFactory.getLogger(FileUploadUtils.class);
	@Autowired
	private MessageChannel ftpUploadChannel;	
	/***
	 * 上传图片
	 * @param file
	 * @param direc 保存路径
	 * @param saveSize 保存格式 例如：150X100;200X800   ; widthXheight
	 * @return
	 * @throws IOException
	 * @throws InterruptedException
	 * @throws ExecutionException
	 * @date 2016年11月1日 下午5:12:47
	 * @author ying.cai
	 * @email ying.cai@ffzxnet.com
	 */
	@ResponseBody
	@RequestMapping(value={"/upload"}, method={org.springframework.web.bind.annotation.RequestMethod.POST})
	public BaseRspJson upload(
			MultipartFile file,String direc,HttpServletResponse response,
			@RequestParam(value="saveSize",required=false)String saveSize
			) throws IOException, InterruptedException, ExecutionException {
		String finalPath = "";
		BaseRspJson rsp = new BaseRspJson();
		try {
			final byte[] bytes = file.getBytes();
			final String fileName = file.getOriginalFilename();
			final String suffix = fileName.substring(fileName.lastIndexOf("."));
			
			List<ImageAttribute> list = new ArrayList<ImageAttribute>();	
			//原图保存
			ImageAttribute imgattr = new ImageAttribute(null,null,false);
			list.add(imgattr);
			
			if(StringUtil.isNotNull(saveSize)){
				String[] sizeList = saveSize.split(";") ;
				String[] itemSize;
				for (String string : sizeList) {
					itemSize = string.split("X");
					ImageAttribute	newImgattr = new ImageAttribute(Integer.parseInt(itemSize[0].trim()),Integer.parseInt(itemSize[1].trim()),true);
					list.add(newImgattr);
				}
			}
			
			String savePath = DateUtil.formatMonthDate(new Date());
			
			if(StringUtil.isNotNull(direc)){
				savePath = savePath + "/" +direc;
				
			}
			savePath="new_2016/"+savePath;
			//保存图片
			String imgUrl = compressSave(bytes,savePath,suffix,list);
			
			//返回图片路径
			finalPath = "/" + savePath + "/" + imgUrl + "_size"+ suffix;
			if(StringUtils.isBlank(imgUrl)){
				logger.error("微商城上传图片失败 ===>>>");
				rsp.setErrorCode(-1);
				rsp.setMessage("上传文件失败");
				return rsp;
			}
		} catch (Exception e) {
			logger.error("微商城上传图片失败 ===>>>");
			rsp.setErrorCode(-1);
			rsp.setMessage("上传文件失败");
			return rsp;
		}
		rsp.setObj(finalPath);
		return rsp;
	}
	
	
	/**
	 * 按图片属性列表参数压缩不同尺寸的图片,返回随机生成的图片名,图片保存名为 XXX_100X75.png
	 * @param bytes
	 * @param path  图片目录
	 * @param suffix 图片后缀
	 * @param list  图片属性列表
	 * @return
	 */
	public String compressSave(byte[] bytes,String path, String suffix,List<ImageAttribute> list){
		String fileId = UUIDGenerator.getUUID();
		Boolean result = false;
		for(ImageAttribute imgattr : list) {
			
			//压缩图片
			byte[] compressedImage = ImageUtil.resize(bytes, imgattr.getWidth(), imgattr.getHeight(), imgattr.isEqualRatio());
			
			//设置图片后缀
			String nameSuffix = 
				imgattr.isNoShowSuffix()?"":((null==imgattr.getWidth()||null==imgattr.getHeight())?"_origin":("_"+imgattr.getWidth()+"X"+imgattr.getHeight()));
			String tmpname = fileId+nameSuffix+suffix;
						
			//设置图片路径
			String  targetFilePath = path;
				
			try {
				//上传图片到ftp服务器
				result = FTPUtil.ftpUpload(ftpUploadChannel, compressedImage, tmpname, targetFilePath);
				if(!result){
					break;
				}
				
			} catch (Exception e) {
				logger.error("图片上传-compressSave-ServiceException", e);
				result=false;
				break;
			}
		}
		if(result){
			return fileId;
		}
		return null;
				
	}
	
	
}
