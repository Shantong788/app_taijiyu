if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) { //判断iPhone|iPad|iPod|iOS
				var i_cookies= localStorage.cookies;
				var i_fish_id = localStorage.fish_id;
				var i_groupId = localStorage.groupId;
				var i_type = localStorage.type;
				var i_per_id = localStorage.per_id;
//				localStorage.setItem('i_num_time',1);
				
			} else if (/(Android)/i.test(navigator.userAgent)) { //判断Android
				var i_cookies= sessionStorage.cookies;
				var i_fish_id = sessionStorage.fish_id;
				var i_groupId = sessionStorage.groupId;
				var i_type = sessionStorage.type;
				var i_per_id = sessionStorage.per_id;
			}
//			----------获取鱼群成员列表-----------
				$.ajax({
					type:"POST",
					url: "http://47.92.96.194:8000/friends/groupMembersFen",
					data:{
						'groupId':i_groupId
					},
					beforeSend: function(res){
						document.cookie = i_cookies+";path=/";
					},
					xhrFields:{
			         	withCredentials: true
			       	},
				    crossDomain: true,
					dataType: 'json',
					success: function(data) {
						var data = data.data;
						console.log(data)
						for (var i = 0; i<data.length; i++) {
							var str = `<div class="banner">
								<div class="banner-b">
									<ul class="Head"><img src="`+data[i].headPic+`"/></ul>
									<div class="group_info">
									<li>LV`+data[i].groupMemberLevel+`</li>
									<ul class="kQing putong">`+data[i].groupMemberHonor+`</ul>
									<span>`+data[i].nickname+`</span>
									</div>
								</div>
							</div>`
							$('.cose').append(str);		
						}
					},
					error: function(xhr, error, ex) {
						console.log("网络有问题！！！");
					}
				});
//				----------获取鱼群管理员列表-----------
					$.ajax({
						type:"POST",
						url: "http://47.92.96.194:8000/friends/groupAdminFen",
						data:{
							'groupId':i_groupId
						},
						beforeSend: function(res){
							document.cookie = i_cookies+";path=/";
						},
						xhrFields:{
				         	withCredentials: true
				       	},
					    crossDomain: true,
						dataType: 'json',
						success: function(data) {
							if (data.data.length == 0) {
								$('.sky').css({'display':'none'})
							}else{
								var data = data.data;
								console.log(data)
								for (var i = 0; i<data.length; i++) {
									var str = `<div class="banner">
										<div class="banner-b">
											<ul class="Head"><img src="`+data[i].headPic+`"/></ul>
											<div class="group_info">
											<li>LV`+data[i].groupMemberLevel+`</li>
											<ul class="kQing putong">`+data[i].groupMemberHonor+`</ul>
											<span>`+data[i].nickname+`</span>
											</div>
										</div>
									</div>`
									$('.sure').append(str);
								}
							}
							
						},
						error: function(xhr, error, ex) {
							console.log("网络有问题！！！");
						}
					});
//					----------获取渔王渔后列表-----------
				$.ajax({
					type:"POST",
					url: "http://47.92.96.194:8000/friends/groupKQ",
					data:{
						'groupId':i_groupId
					},
					beforeSend: function(res){
						document.cookie = i_cookies+";path=/";
					},
					xhrFields:{
			         	withCredentials: true
			       	},
				    crossDomain: true,
					dataType: 'json',
					success: function(data) {
						var data = data.data;
						console.log(data)
						
				for (var i = 0; i<data.length; i++) {
					if (data[i].groupMemberHonor=='king') {
						var str = `<div class="banner">
							<div class="banner-b">
								<ul class="Head"><img src="`+data[i].headPic+`"/></ul>
								<div class="group_info">
								<li>LV`+data[i].groupMemberLevel+`</li>
								<ul class="kQing">渔王</ul>
								<span>`+data[i].nickname+`</span>
								</div>
							</div>
						</div>`
						$('.aways').prepend(str);
					}else if (data[i].groupMemberHonor=='queen') {
						var str = `<div class="banner">
							<div class="banner-b">
								<ul class="Head"><img src="`+data[i].headPic+`"/></ul>
								<div class="group_info">
								<li>LV`+data[i].groupMemberLevel+`</li>
								<ul class="kQing">渔后</ul>
								<span>`+data[i].nickname+`</span>
							</div>
							</div>
						</div>`
						$('.aways').prepend(str);
					}	
				}
			},
			error: function(xhr, error, ex) {
				console.log("网络有问题！！！");
			}
		});