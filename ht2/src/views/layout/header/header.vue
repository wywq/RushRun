<template>
	<div>
		<el-header id="header">
			<span class="hideAside" @click="collapse"><i class="fa fa-indent fa-lg"></i></span>
			<ul class="personal">
				<!-- {{$store.getters.token}} -->

				<!-- <li>{{ $t(`role.${this.$store.getters.info.role}`) }}</li> -->
				<li>
					<el-dropdown @command="handleCommand">
						<span class="el-dropdown-link">
							{{names.user_name}}<i class="el-icon-arrow-down el-icon--right"></i>
						</span>
						<el-dropdown-menu slot="dropdown">
							<!-- <el-dropdown-item command="a">{{ $t('userDropdownMenu.basicInfor') }}</el-dropdown-item> -->
							<el-dropdown-item command="b">
								<div @click="modifyPasswordClick">修改密码</div>
							</el-dropdown-item>
							<el-dropdown-item command="logout" divided >退出登录</el-dropdown-item>
						</el-dropdown-menu>
					</el-dropdown>
				</li>
			</ul>
		</el-header>
		<!-- 遮罩 -->
		<!-- 添加管理员弹窗 -->
		<div class="mark" v-if="is_show == 1">
			<div class="mark-content">
				<div class="hytj">修改管理员密码</div>
				<!-- 提交的表单 -->
				<el-form class="submitform">
					<table style="width:90%;height:80px; border:1px dashed #000;background:#F9F9F9" rules="all">
						<tr>
							<td class="td1">管理员名称:</td>
							<td class="td2">
								{{submitform.name}}
							</td>
						</tr>
						<tr>
							<td class="td1">管理员原始密码:</td>
							<td class="td2">
								<el-input type="password" v-model="submitform.oldpassword" size="small" clearable :show-password="false"></el-input>
							</td>
						</tr>
						<tr>
							<td class="td1">管理员新密码:</td>
							<td class="td2">
								<el-input type="password" v-model="submitform.newpassword" size="small" clearable :show-password="false"></el-input>
							</td>
						</tr>
						<tr>
							<td></td>
							<td class="td2">
								<el-button type="primary" @click="onSubmitClick" size="small">提交</el-button>
								<el-button type="primary" @click="clone" size="small">返回</el-button>
							</td>
						</tr>
					</table>
				</el-form>
			</div>
		</div>

		<tabNav></tabNav>
	</div>
</template>

<script>
	import Cookies from 'js-cookie'
	import langSelect from '../../../components/lang/langSelect'
	import tabNav from './tabNav'
	import util from '@/utils/utils.js'
	import service from '@/service/service.js'
	export default {
		name: 'Header',
		components: {
			tabNav,
			langSelect
		},
		data() {
			return {
				is_show: 0,
				isfullScreen: true,
				avatar: './static/images/icon.jpg',
				submitform: {
					name: '',
					password: '',
					oldpassword: '',
					newpassword: ''
				},
				names:''
			}
		},
		async created() {
			const firstindex = await service.firstindex();
			if(firstindex.data.status==1){
				this.names = firstindex.data.data
			}
			this.name = util.getCookie("username")
			this.admin_id = util.getCookie("admin_id")
			this.submitform.name = util.getCookie("username")
		},
		methods: {
			collapse() {
				this.$store.dispatch('collapse')
			},
			// 修改密码弹窗
			modifyPasswordClick() {
				this.is_show = 1
			},
			fullScreen() {
				if (this.isfullScreen) {
					var docElm = document.documentElement
					if (docElm.requestFullscreen) {
						docElm.requestFullscreen()
					} else if (docElm.mozRequestFullScreen) {
						docElm.mozRequestFullScreen()
					} else if (docElm.webkitRequestFullScreen) {
						docElm.webkitRequestFullScreen()
					} else if (elem.msRequestFullscreen) {
						elem.msRequestFullscreen()
					}
					this.isfullScreen = false
				} else {
					if (document.exitFullscreen) {
						document.exitFullscreen()
					} else if (document.mozCancelFullScreen) {
						document.mozCancelFullScreen()
					} else if (document.webkitCancelFullScreen) {
						document.webkitCancelFullScreen()
					} else if (document.msExitFullscreen) {
						document.msExitFullscreen()
					}
					this.isfullScreen = true
				}
			},
			// 退出登录
			/*exitLoginClick() {
				this.$store.commit('getInfo','')
				util.delCookie('token')
				Cookies.remove('token');
				location.reload()
				this.$router.push({
					path: '/login'
				})
			},*/
			
			handleCommand(command) {
				console.log(command)
				if (command === 'logout') {
					Cookies.remove('token');
					location.reload()
					util.setCookie("token",'123456789')
				}
			},
			// 修改密码
			async onSubmitClick() {
				console.log(this.submitform)
				if (this.submitform.oldpassword == '') {
					this.$message.error('请输入原始密码');
					return ; 
				}
				if (this.submitform.newpassword == '') {
					this.$message.error('请输入新密码');
					return;
				}
				if (this.submitform.newpassword == this.submitform.oldpassword) {
					this.$message.error('新密码与原始密码不能相等');
					return;
				}
				const pwdUpdate = await service.pwdUpdate({
					token: util.getCookie("token"),
					password: this.submitform.oldpassword,
					new_pwd: this.submitform.newpassword,
					admin_id: this.admin_id,
				})
				if (pwdUpdate.data.status == 1) {
					this.$message.success('修改成功');
					this.is_show = 0
					this.submitform.oldpassword = ''
					this.submitform.newpassword = ''
				} else {
					this.$message.error(pwdUpdate.data.info);
				}
			},
			// 关闭弹窗
			clone() {
				this.is_show = 0
			}
		}
	}
</script>

<style lang="scss">
	$top: top;
	$bottom: bottom;
	$left: left;
	$right: right;
	$leftright: ($left, $right);

	%w100 {
		width: 100%;
	}

	%h100 {
		height: 100%;
	}

	%cursor {
		cursor: pointer;
	}

	html,
	body,
	#app,
	.el-container,
	#asideNav,
	ul.el-menu {
		@extend %h100;
	}

	@mixin set-value($side, $value) {
		@each $prop in $leftright {
			#{$side}-#{$prop}: $value;
		}
	}

	#header {
		max-height: 50px;
		line-height: 50px;
		box-shadow: 0 1px 2px 0 rgba(0, 0, 0, .05);
		display: flex;
		justify-content: space-between;

		.hideAside {
			@extend %cursor;
		}

		.personal {
			display: flex;
			flex-direction: row;

			li {
				@include set-value(margin, 13px);
				font-size: 12px;
			}

			.fullScreen {
				@extend %cursor;
			}

			.el-dropdown-link {
				@extend %cursor;
			}

			.icon img {
				margin-#{$top}: 7px;
				-webkit-border-radius: 5px;
				-moz-border-radius: 5px;
				border-radius: 5px;
				width: 40px;
				height: 40px;
			}
		}
	}

	/* 遮罩 */
	.mark {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: rgba(0, 0, 0, 0.5);
		z-index: 999;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.mark-content {
		width: 70%;
		height: 50%;
		background: #f0f2f5;
		overflow: auto;
	}

	.hytj {
		color: #666666;
		padding: 15px 0;
		text-align: center;
		border-bottom: 1px solid #D7D7D7;
		font-size: 28px;

	}

	/* 添加会员表单 */
	.submitform {
		margin: 15px 0;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.submitform .el-input {
		margin-right: 10px;
		width: 270px;
		float: left;
		display: flex;
		align-items: center;
		height: 100%;
	}

	tr {
		height: 50px;
		width: 100%;
		border: 1px lightgray dashed;
	}

	.td1 {
		text-align: right;
		padding-right: 10px;
	}

	.td2 {
		padding-left: 10px;
	}
</style>
