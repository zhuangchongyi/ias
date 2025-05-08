DROP TABLE IF EXISTS sys_user;
CREATE TABLE sys_user
(
    id         BIGINT PRIMARY KEY AUTO_INCREMENT COMMENT '用户ID',
    username    VARCHAR(50)  NOT NULL COMMENT '用户名',
    password    VARCHAR(255) NOT NULL COMMENT '密码',
    nickname    VARCHAR(50) COMMENT '昵称',
    avatar      VARCHAR(255) COMMENT '头像',
    email       VARCHAR(50) COMMENT '邮箱',
    phone       VARCHAR(20) COMMENT '手机号',
    gender     TINYINT(1) COMMENT '性别（1男 2女）',
    status     TINYINT(1) DEFAULT 1 COMMENT '帐号状态（0禁用 1启用）',
    login_ip   VARCHAR(128) NULL COMMENT '最后登录IP',
    login_date DATETIME     NULL COMMENT '最后登录时间',
    create_id  BIGINT COMMENT '创建人ID',
    create_by   VARCHAR(50) COMMENT '创建人名称',
    create_time DATETIME   DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    update_id  BIGINT COMMENT '更新人ID',
    update_by   VARCHAR(50) COMMENT '更新人名称',
    update_time DATETIME   DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    del_flag   TINYINT(1) DEFAULT 0 COMMENT '是否删除（0否 1是）'
) AUTO_INCREMENT = 1000 COMMENT = '用户表';

INSERT INTO sys_user (id, username, password, nickname, avatar)
VALUES (1, 'admin', '$2a$10$agPA/b0ntfiEEMHm51OIs.tx/NQxUyoIUwor95BfoafmMw9iltJQS', '系统管理员',
        'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png');

DROP TABLE IF EXISTS sys_role;
CREATE TABLE sys_role
(
    id        BIGINT AUTO_INCREMENT PRIMARY KEY COMMENT '角色ID',
    role_key  VARCHAR(100) NOT NULL COMMENT '角色权限字符串',
    role_name VARCHAR(30)  NOT NULL COMMENT '角色名称',
    order_num INT        DEFAULT 1 COMMENT '显示顺序',
    status    TINYINT(1) DEFAULT 1 COMMENT '角色状态（0禁用 1启用）',
    create_id BIGINT COMMENT '创建人ID',
    create_by   VARCHAR(50) COMMENT '创建人名称',
    create_time DATETIME   DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    update_id BIGINT COMMENT '更新人ID',
    update_by   VARCHAR(50) COMMENT '更新人名称',
    update_time DATETIME   DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    del_flag  TINYINT(1) DEFAULT 0 COMMENT '是否删除（0否 1是）'
) AUTO_INCREMENT = 1000 COMMENT = '角色表';

INSERT INTO sys_role (id, role_key, role_name, order_num, status)
VALUES (1, 'admin', '系统管理员', 1, 1);

DROP TABLE IF EXISTS sys_dept;
CREATE TABLE sys_dept
(
    id        BIGINT AUTO_INCREMENT PRIMARY KEY COMMENT '部门id',
    parent_id BIGINT     DEFAULT 0 COMMENT '父部门id',
    ancestors VARCHAR(100) COMMENT '祖级列表',
    dept_name VARCHAR(30) COMMENT '部门名称',
    order_num INT COMMENT '显示顺序',
    status    TINYINT(1) DEFAULT 1 COMMENT '部门状态（0禁用 1启用）',
    create_id BIGINT COMMENT '创建人ID',
    create_by   VARCHAR(50) COMMENT '创建人名称',
    create_time DATETIME   DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    update_id BIGINT COMMENT '更新人ID',
    update_by   VARCHAR(50) COMMENT '更新人名称',
    update_time DATETIME   DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    del_flag  TINYINT(1) DEFAULT 0 COMMENT '是否删除（0否 1是）'
) AUTO_INCREMENT = 1000 COMMENT = '部门表';

INSERT INTO sys_dept (id, parent_id, dept_name, order_num, status)
VALUES (1, 0, '总公司', 1, 1);

DROP TABLE IF EXISTS sys_permission;
CREATE TABLE sys_permission
(
    id              BIGINT AUTO_INCREMENT PRIMARY KEY COMMENT '权限ID',
    parent_id       BIGINT     DEFAULT 0 COMMENT '父级id',
    permission_key  VARCHAR(100) NOT NULL COMMENT '权限字符串',
    permission_name VARCHAR(100) NOT NULL COMMENT '权限名称',
    order_num       INT        DEFAULT 1 COMMENT '显示顺序',
    create_id       BIGINT COMMENT '创建人ID',
    create_by       VARCHAR(50) COMMENT '创建人名称',
    create_time     DATETIME   DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    update_id       BIGINT COMMENT '更新人ID',
    update_by       VARCHAR(50) COMMENT '更新人名称',
    update_time     DATETIME   DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    del_flag        TINYINT(1) DEFAULT 0 COMMENT '是否删除（0否 1是）'
) AUTO_INCREMENT = 1000 COMMENT = '权限表';

DROP TABLE IF EXISTS sys_file;
CREATE TABLE sys_file
(
    id        BIGINT PRIMARY KEY COMMENT '文件ID',
    file_name VARCHAR(200) COMMENT '文件名称',
    file_size BIGINT COMMENT '文件大小(B)',
    file_type VARCHAR(20) COMMENT '文件类型',
    file_id   VARCHAR(255) COMMENT '文件哈希值ID',
    file_data LONGBLOB COMMENT '文件数据',
    create_id BIGINT COMMENT '创建人ID',
    create_by   VARCHAR(50) COMMENT '创建人名称',
    create_time DATETIME   DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    update_id BIGINT COMMENT '更新人ID',
    update_by   VARCHAR(50) COMMENT '更新人名称',
    update_time DATETIME   DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    del_flag  TINYINT(1) DEFAULT 0 COMMENT '是否删除（0否 1是）'
) COMMENT = '文件表';

DROP TABLE IF EXISTS sys_user_face;
CREATE TABLE sys_user_face
(
    id        BIGINT AUTO_INCREMENT PRIMARY KEY COMMENT 'ID',
    user_id   BIGINT COMMENT '用户ID',
    file_url  VARCHAR(255) COMMENT '文件地址url',
    face_id   VARCHAR(36) COMMENT '人脸数据ID',
    create_id BIGINT COMMENT '创建人ID',
    create_by   VARCHAR(50) COMMENT '创建人名称',
    create_time DATETIME   DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    update_id BIGINT COMMENT '更新人ID',
    update_by   VARCHAR(50) COMMENT '更新人名称',
    update_time DATETIME   DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    del_flag  TINYINT(1) DEFAULT 0 COMMENT '是否删除（0否 1是）'
) COMMENT = '用户人脸记录表';

DROP TABLE IF EXISTS sys_record_attendance;
CREATE TABLE sys_record_attendance
(
    id           BIGINT AUTO_INCREMENT PRIMARY KEY COMMENT 'ID',
    user_id      BIGINT     NOT NULL COMMENT '用户ID',
    punch_source TINYINT(1) NOT NULL COMMENT '打卡来源（1自动 2补卡）',
    punch_type   TINYINT(1) NOT NULL COMMENT '打卡类型（1上班打卡 2迟到打卡 3下班打卡）',
    punch_mode   TINYINT(1) NOT NULL COMMENT '打卡方式（1人脸打卡 2定位打卡）',
    punch_time   DATETIME   NOT NULL COMMENT '打卡时间',
    face_id      VARCHAR(36) COMMENT '人脸打卡时的人脸数据ID',
    location     VARCHAR(255) COMMENT '打卡位置（用于定位打卡）',
    create_id    BIGINT COMMENT '创建人ID',
    create_by    VARCHAR(50) COMMENT '创建人名称',
    create_time  DATETIME   DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    update_id    BIGINT COMMENT '更新人ID',
    update_by    VARCHAR(50) COMMENT '更新人名称',
    update_time  DATETIME   DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    del_flag     TINYINT(1) DEFAULT 0 COMMENT '是否删除（0否 1是）'
) COMMENT = '打卡记录表';

DROP TABLE IF EXISTS sys_record_repair;
CREATE TABLE sys_record_repair
(
    id            BIGINT AUTO_INCREMENT PRIMARY KEY COMMENT 'ID',
    user_id       BIGINT     NOT NULL COMMENT '用户ID',
    attendance_id BIGINT     NOT NULL COMMENT '打卡记录ID',
    repair_type   TINYINT(1) NOT NULL COMMENT '补卡类型（1上班 2下班）',
    repair_time   DATETIME   NOT NULL COMMENT '补卡时间',
    reason        VARCHAR(255) COMMENT '补卡原因',
    status        TINYINT(1) DEFAULT 0 COMMENT '审核状态（0待审核 1已通过 2已拒绝）',
    create_id     BIGINT COMMENT '创建人ID',
    create_by     VARCHAR(50) COMMENT '创建人名称',
    create_time   DATETIME   DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    update_id     BIGINT COMMENT '更新人ID',
    update_by     VARCHAR(50) COMMENT '更新人名称',
    update_time   DATETIME   DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    del_flag      TINYINT(1) DEFAULT 0 COMMENT '是否删除（0否 1是）'
) COMMENT = '补卡记录表';

DROP TABLE IF EXISTS sys_user_role;
CREATE TABLE sys_user_role
(
    user_id BIGINT NOT NULL COMMENT '用户ID',
    role_id BIGINT NOT NULL COMMENT '角色ID',
    UNIQUE (user_id, role_id)
) AUTO_INCREMENT = 1 COMMENT = '用户角色表';

DROP TABLE IF EXISTS sys_user_dept;
CREATE TABLE sys_user_dept
(
    user_id BIGINT NOT NULL COMMENT '用户ID',
    dept_id BIGINT NOT NULL COMMENT '部门ID',
    UNIQUE (user_id, dept_id)
) AUTO_INCREMENT = 1 COMMENT = '用户部门表';

DROP TABLE IF EXISTS sys_role_permission;
CREATE TABLE sys_role_permission
(
    role_id       BIGINT NOT NULL COMMENT '角色ID',
    permission_id BIGINT NOT NULL COMMENT '权限ID',
    UNIQUE (permission_id, role_id)
) AUTO_INCREMENT = 1 COMMENT = '角色权限表';