---
layout: default
title: 用户注册时附加其他信息
sitemap:
priority: 0.5
lastmod: 2017-02-15T22:30:00-00:00
---

# 用户注册时附加其他信息

__提交者 [@Paul-Etienne](https://github.com/Paul-Etienne)__

如果我们需要存储的信息比JHipster默认提供的信息更多，则需要进行一些调整。

为了说明这一点，假设我们要存储用户的电话号码。

## 与JHI_User建立一对一关系的新实体

添加默认JHipster用户无法处理的信息的最佳方法是，在通过一对一关系与其链接的新实体中使用聚合。

创建此实体后，我们将其称为UserExtra，处理其ID的最佳方法是将其映射到JHI_User的ID。 这样，我们的UserExtra将具有与用户相同的ID，从而加速了不同的请求。
为此，您将需要使用@MapsId注解：

```
public class UserExtra implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    private Long id;

    @Column(name = "phone")
    private String phone;

    @OneToOne
    @MapsId
    private User user;
    ...

}
```

请注意，需要删除ID上的@GeneratedValue注解。

## 更新注册HTML页面以考虑此更改

现在已经存在一个实体来存储电话号码，我们需要在注册表单中添加输入以询问用户的电话号码。

如此简单，只需更新webapp/app/account/register/register.html以添加一个输入字段，该输入字段绑定到已经用于存储基本信息（vm.registerAccount）的变量：

```
<input class="form-control" id="phone" ng-model="vm.registerAccount.phone" placeholder="{{'global.form.phone.placeholder' | translate}}" />
```

## 更新 ManagedUserVM

来自java/com.mycompany.myapp/web/rest/AccountResource的registerAccount()方法接收注册页面的请求。
它的唯一参数是ManagedUserVM对象，该对象包含来自客户端的vm.registerAccount变量中最初包含的信息。

位于web/rest/vm中的ManagedUserVM类也必须进行更新，以便保存客户端发送的电话号码。 唯一要做的就是添加电话号码属性及其getter：

```
public class ManagedUserVM extends UserDTO {

    // Default attributes omitted for brevity

    private String phone;

    ...

    public String getPhone() {
        return phone;
    }

}
```

## 更新AccountResource中registerAccount()方法

现在，registerAccount()方法将接收一个ManagedUserVM对象，该对象还包含用户的电话号码。 剩下要做的就是将此电话号码保存到与JHipster用户关联的新UserExtra中。

为此，我们将把phone参数从UserService添加到createUser()方法中。 但首先，在registerAccount()中调用此函数的位置添加此参数：

```
public ResponseEntity<?> registerAccount(@Valid @RequestBody ManagedUserVM managedUserVM) {

    HttpHeaders textPlainHeaders = new HttpHeaders();
    textPlainHeaders.setContentType(MediaType.TEXT_PLAIN);

    return userRepository.findOneByLogin(managedUserVM.getLogin().toLowerCase())
        .map(user -> new ResponseEntity<>("login already in use", textPlainHeaders, HttpStatus.BAD_REQUEST))
        .orElseGet(() -> userRepository.findOneByEmail(managedUserVM.getEmail())
            .map(user -> new ResponseEntity<>("e-mail address already in use", textPlainHeaders, HttpStatus.BAD_REQUEST))
            .orElseGet(() -> {
                User user = userService
                    .createUser(managedUserVM.getLogin(), managedUserVM.getPassword(),
                        managedUserVM.getFirstName(), managedUserVM.getLastName(),
                        managedUserVM.getEmail().toLowerCase(), managedUserVM.getLangKey(),
                        managedUserVM.getPhone());

                mailService.sendActivationEmail(user);
                return new ResponseEntity<>(HttpStatus.CREATED);
            })
    );
}
```

## 更新UserService中的createUser()方法

最后，我们更新了保存JHI_User的服务层功能，现在也保存了UserExtra。建议您使用其他参数来创建一个新方法，而不是更新现有方法。

不要忘记注入UserExtra的Repository：

```
@Inject
private UserExtraRepository userExtraRepository;

@Inject
private UserExtraSearchRepository userExtraSearchRepository;

...

public User createUser(String login, String password, String firstName, String lastName, String email,
                           String langKey, String phone) {

    User newUser = new User();
    Authority authority = authorityRepository.findOne(AuthoritiesConstants.USER);
    Set<Authority> authorities = new HashSet<>();
    String encryptedPassword = passwordEncoder.encode(password);
    newUser.setLogin(login);
    // new user gets initially a generated password
    newUser.setPassword(encryptedPassword);
    newUser.setFirstName(firstName);
    newUser.setLastName(lastName);
    newUser.setEmail(email);
    newUser.setLangKey(langKey);
    // new user is not active
    newUser.setActivated(false);
    // new user gets registration key
    newUser.setActivationKey(RandomUtil.generateActivationKey());
    authorities.add(authority);
    newUser.setAuthorities(authorities);
    userRepository.save(newUser);
    userSearchRepository.save(newUser);
    log.debug("Created Information for User: {}", newUser);

    // Create and save the UserExtra entity
    UserExtra newUserExtra = new UserExtra();
    newUserExtra.setUser(newUser);
    newUserExtra.setPhone(phone);
    userExtraRepository.save(newUserExtra);
    userExtraSearchRepository.save(newUserExtra);
    log.debug("Created Information for UserExtra: {}", newUserExtra);

    return newUser;
}
```

完成了！
