---
layout: default
title: 如何创建一个新的权限（Authority）
sitemap:
priority: 0.1
lastmod: 2018-10-05T18:20:00-00:00
---
# 如何创建一个新的权限（Authority）

__提交者 [@Tonterias](https://github.com/Tonterias)__

假设除了给定的ADMIN和USER之外，您还需要一个新的权限。

修改AuthoritiesConstants.java文件以包括您的新权限：

	/**
	 * Constants for Spring Security authorities.
	 */
	public final class AuthoritiesConstants {
	
	    public static final String ADMIN = "ROLE_ADMIN";
	
	    public static final String USER = "ROLE_USER";
	
	    public static final String ANONYMOUS = "ROLE_ANONYMOUS";
	
	    private AuthoritiesConstants() {
	    }
	}

Do not forget to include your new role in your authorities.csv:

	name
	ROLE_ADMIN
	ROLE_USER
	ROLE_ANONYMOUS


这样，您将可以在SecurityConfiguration.java或（FrontpageconfigResource.java）中使用它，例如：
	
	@DeleteMapping("/order-items/{id}")
	@Timed
	@PreAuthorize("hasAuthority('ROLE_ADMIN')")
	public ResponseEntity<Void> deleteOrderItem(@PathVariable Long id) {
	    ...
	}

以及Angular文件中，`jhiHasAnyAuthority=[‘ROLE_ADMIN’. ‘ROLE_X’ ……]`甚至路由文件中使用它：

	export const messageRoute: Routes = [
	    {
	        path: 'message',
	        component: MessageComponent,
	        data: {
	            authorities: ['ROLE_USER'],
	            pageTitle: 'Messages'
	        },
	        canActivate: [UserRouteAccessService]
	    }
	];

开源示例位于JhipsterPress: https://github.com/Tonterias/JhipsterPress
