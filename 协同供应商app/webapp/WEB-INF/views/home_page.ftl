<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<meta name="viewport" content="initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
		<title></title>
		<style type="text/css">
			body,ul,a,li,img,dt,dl,dd,h1,h2,h3,h4,h5,h6,input,p,form{margin:0px;padding:0px;}
			input{font-family:"Arial","微软雅黑";}
			body{font-family:"Arial","微软雅黑"; line-height:30px; color:#666666; font-size:16px;background-color: #F2F2F2;}
			
			section{margin: 1%;}
			table{background-color: #ffffff;width: 100%; border-radius: 10px;text-align: center;padding: 1%;}
			table thead tr th{border-bottom: solid 1px #ccc;border-right: solid 1px #ccc;}
			table thead tr th:last-child{border-right: none;}
			
			table tbody tr td{border-right: solid 1px #ccc;}
			table tbody tr td:last-child{border-right: none;}

			.p_title{color: #999999;margin: 1%;}
		</style>
	</head>

	<body>
		<p class="p_title">近半年销量报表 单位（元）</p>
		<section>
			<table id="salesVolumeTB" cellpadding="0" cellspacing="0">
				<thead>
					<tr>
						<th>月份</th>
						<th>销售总额</th>
						<th>退款总额</th>
						<th>实销总额</th>
					</tr>
				</thead>
				<tbody>
					
				</tbody>
			</table>
		 </section>
		 
		 <section>
		 	<div id="container" class="highchartCont" style="margin: 0 auto"></div>
		 </section>
		 
		<#include "./common/js.ftl" encoding="utf-8">
		<script type="text/javascript">
		</script>
	</body>

</html>