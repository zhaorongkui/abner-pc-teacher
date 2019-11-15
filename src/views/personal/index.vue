<template>
  <div class="personal-wrap">
    <div class="personal-banner">
      <img
        v-if="isShowPic"
        alt=""
        :src="teacherInfos.userHadportraitPath"
        @click="imgload"
      />
      <img src="../../assets/personal.png" alt="" @click="imgload" v-else />
    </div>
    <div class="personal-editors">
      <div class="personal-editors-top">
        <div>
          <label>姓名</label>
          <span>{{ teacherInfos.teacherName }}</span>
        </div>
        <div>
          <label>当前课本</label>
          <el-select v-model="value" placeholder="请选择" @change="bookChange">
            <el-option
              v-for="item in bookList"
              :key="item.textbookId"
              :value="item.textbookName"
            ></el-option>
          </el-select>
        </div>
        <div>
          <label>手机号码</label>
          <span class="modify-tel-w">
            <span>{{ teacherInfos.teacherPhonenum }}</span>
            <span class="modify-tel" @click="show_tel_dialog">修改</span>
            <span class="modify-tel-btn" @click="show_tel_dialog"></span>
          </span>
        </div>
        <div>
          <label>任课班级</label>
          <span>
            <span
              v-for="item in teacherInfos.classes"
              :key="item.index"
              class="gradeClassname"
              >{{ item.gradeClassname }}</span
            >
          </span>
        </div>
        <div>
          <label>所在学校</label>
          <span>{{ teacherInfos.schoolName }}</span>
        </div>
        <div>
          <label>学科</label>
          <span>{{ teacherInfos.subjectName }}</span>
        </div>
      </div>
      <div class="personal-editors-bottom">
        <label>其他功能</label>
        <div>
          <a href="javascript:;">
            <img
              src="../../assets/keywords.png"
              alt=""
              @click="show_pas_dialog"
            />
            <span>更改密码</span>
          </a>
          <a href="javascript:;">
            <img
              src="../../assets/useragree.png"
              alt=""
              @click="show_agree_dialog"
            />
            <span>用户协议</span>
          </a>
          <a href="javascript:;">
            <img
              src="../../assets/feedback.png"
              alt=""
              @click="show_mag_dialog"
            />
            <span>反馈建议</span>
          </a>
        </div>
      </div>
    </div>
    <div class="v-upload-wrap" v-if="showDialog_cropper">
      <div class="v-upload-wrap-croppers">
        <div class="v-upload-wrap-t">
          更改头像
        </div>
        <div class="v-pre-img">
          选择头像上传
          <input
            class="crop-input"
            id="file_uploade"
            type="file"
            name="image"
            accept="image/*"
            @change="uploadImg($event)"
          />
        </div>
        <div class="v-img-gs">
          仅支持jpg、png图形文件，且文件小于5M
        </div>
        <div class="v-img-cropper" id="cropper-el">
          <VueCropper
            ref="cropper"
            :img="option.img"
            :outputSize="option.size"
            :outputType="option.outputType"
            :info="true"
            :full="option.full"
            :canMove="option.canMove"
            :canMoveBox="option.canMoveBox"
            :original="option.original"
            :autoCrop="option.autoCrop"
            :autoCropWidth="option.autoCropWidth"
            :autoCropHeight="option.autoCropHeight"
            :fixedBox="option.fixedBox"
            @realTime="realTime"
            style="width:100%;height:100%;overflow: hidden"
            v-if="option.img"
          ></VueCropper>
          <div class="v-default-cropper" v-else></div>
        </div>
        <div class="dialog-footer">
          <button @click="cancelCrop">取 消</button>
          <button @click="finish('base')">保存修改</button>
        </div>
      </div>
    </div>
    <!--修改密码弹框-->
    <div class="modify-pas-dialog-wrap" v-if="showDialog_pas">
      <div class="modify-pas-dialog">
        <div class="modify-pas-dialog-header">
          <span>更改密码</span>
          <img src="../../assets/close.png" alt="" @click="close_pas_dialog" />
        </div>
        <div class="modify-pas-dialog-form">
          <div>
            <img src="../../assets/phone.png" alt="" />
            <input
              type="text"
              v-model="old_tel"
              class="reset_int_style"
              placeholder="输入原手机号"
              disabled
            />
            <!-- <img src="" alt="" v-show="false" />
            <img
              src="../../assets/clear.png"
              alt=""
              v-show="old_tel != ''"
              @click="clear_val(1)"
            /> -->
          </div>
          <div>
            <img src="../../assets/vcode.png" alt="" />
            <input
              type="text"
              v-model="vcode_pas"
              class="reset_int_style_"
              placeholder="请输入验证码"
            />
            <span class="get-code" @click="getPhoneCode('pas')" v-if="isGetCode"
              >获取验证码</span
            >
            <span class="get-code" v-else>重新获取验证码{{ countDown }}s</span>
            <img
              src="../../assets/clear.png"
              alt=""
              v-show="vcode_pas != ''"
              @click="clear_val(2)"
              class="clear_btn"
            />
          </div>
          <div>
            <img src="../../assets/newp.png" alt="" />
            <input
              :type="new_inputType"
              v-model="new_pas"
              placeholder="输入新密码"
            />
            <img :src="new_imgUrl" alt="" @click="hid_password(1)" />
            <img
              src="../../assets/clear.png"
              alt=""
              v-show="new_pas != ''"
              @click="clear_val(3)"
            />
          </div>
          <div>
            <img src="../../assets/newp.png" alt="" />
            <input
              :type="confirm_inputType"
              v-model="confirm_pas"
              placeholder="确认新密码"
            />
            <img :src="confirm_imgUrl" alt="" @click="hid_password(2)" />
            <img
              src="../../assets/clear.png"
              alt=""
              v-show="confirm_pas != ''"
              @click="clear_val(4)"
            />
          </div>
        </div>
        <button @click="modify_pas" class="modify_btn">确定</button>
      </div>
    </div>
    <!--修改手机弹框-->
    <div class="modify-pas-dialog-wrap" v-if="showDialog_tel">
      <div class="modify-pas-dialog">
        <div class="modify-pas-dialog-header">
          <span>更改手机号</span>
          <img src="../../assets/close.png" alt="" @click="close_tel_dialog" />
        </div>
        <div class="modify-pas-dialog-form">
          <div>
            <img src="../../assets/password1.png" alt="" />
            <input
              :type="old_inputType"
              v-model="old_pas"
              placeholder="输入原密码"
            />
            <img :src="old_imgUrl" alt="" @click="hid_password(3)" />
            <img
              src="../../assets/clear.png"
              alt=""
              v-show="old_pas != ''"
              @click="clear_val(5)"
            />
          </div>
          <div>
            <img src="../../assets/phone.png" alt="" />
            <input
              type="text"
              v-model.trim="new_tel"
              class="reset_int_style"
              placeholder="输入手机号"
            />
            <img src="" alt="" v-show="false" />
            <img
              src="../../assets/clear.png"
              alt=""
              v-show="new_tel != ''"
              @click="clear_val(6)"
            />
          </div>
          <div>
            <img src="../../assets/vcode.png" alt="" />
            <input
              type="text"
              v-model="vcode_tel"
              placeholder="输入验证码"
              class="reset_int_style_"
            />
            <span
              class="get-code"
              @click="getPhoneCode('phone')"
              v-if="isGetCode"
              >获取验证码</span
            >
            <span class="get-code" v-else>重新获取验证码{{ countDown }}s</span>
            <img
              src="../../assets/clear.png"
              alt=""
              v-show="vcode_tel != ''"
              @click="clear_val(7)"
              class="clear_btn"
            />
          </div>
        </div>
        <button @click="modify_tel" class="modify_btn">确定</button>
      </div>
    </div>
    <!--协议弹框-->
    <div class="agreement-wrap" v-if="showDialog_agree">
      <div class="agreement-dialog">
        <div class="agreement-dialog-header">
          <span>用户协议</span>
          <img
            src="../../assets/close.png"
            alt=""
            @click="close_agree_dialog"
          />
        </div>
        <div class="agreement-dialog-body">
          <div class="agreement-dialog-tap">
            <span
              @click="agreementTap(1)"
              :class="agreeIndex === 1 ? 'active' : ''"
              >服务使用协议</span
            >
            <span></span>
            <span
              @click="agreementTap(2)"
              :class="agreeIndex === 2 ? 'active' : ''"
              >隐私协议</span
            >
          </div>
          <div class="serve-agreement" v-if="agreeIndex === 1">
            <p>温馨提示：本协议适用乐知帮乐知帮注册用户。</p>
            <p>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;在使用乐知帮产品（Pad端、SaaS端、移动端和小程序端）之前，您应当认真阅读并遵守《乐知帮服务协议》（以下简称“本协议”），请您务必审慎阅读、充分理解各条款内容，特别是免除或者限制责任的条款、争议解决和法律适用条款。免除或者限制责任的条款可能将以加粗字体显示，您应重点阅读。如您对本协议有任何疑问，可向客服咨询。
            </p>
            <p>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;当您按照注册页面提示填写信息、阅读并同意本协议且完成全部注册程序后，即表示您已充分阅读、理解并接受本协议的全部内容，并同意受本协议约束。本协议内容包括协议正文及所有乐知帮已经发布的各类规则。所有规则为本协议不可分割的一部分，与本协议正文具有同等法律效力。您承诺接受并遵守本协议的约定，届时您不应以未阅读本协议的内容或者未获得乐知帮对您问询的解答等理由，主张本协议无效，或要求撤销本协议。
            </p>
            <p>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;乐知帮有权根据需要不时地制定、修改本协议或各类规则，如本协议有任何变更，乐知帮将在平台上刊载公告通知，无需另行单独通知您。经修订的条款一经在乐知帮平台公布后，立即自动生效。如您不同意相关变更，请立即停止使用乐知帮所有服务。如您在修订条款生效后继续使用乐知帮提供的服务，则视为您已接受经修订的协议和规则并愿意受修订后协议及规则的约束。除另行明确声明外，任何使“服务”范围扩大或功能增强的新内容均受本协议约束。
            </p>
            <p>第一条 协议范围</p>
            <p>
              &nbsp;&nbsp;1.1
              本协议由您与乐知帮共同缔结，具有合同效力，协议签约的另一方称为用户。
            </p>
            <p>
              &nbsp;&nbsp;1.2
              除另行明确声明外，乐知帮服务包含任何乐知帮提供的基于App、PC端互联网和移动端互联网等平台的相关服务，且均受本协议约束。
            </p>
            <p>
              &nbsp;&nbsp;1.3
              本协议不涉及您与其他乐知帮平台用户之间因网上交易而产生的法律关系及法律纠纷。
            </p>
            <p>
              &nbsp;&nbsp;1.4
              如果您不同意本协议的约定，您应立即停止注册程序或停止使用乐知帮服务。
            </p>
            <p>第二条 用户注册、使用规范</p>
            <p>
              &nbsp;&nbsp;2.1
              用户注册是指用户登陆乐知帮平台，按要求填写相关信息并确认同意履行本服务协议的过程。
            </p>
            <p>&nbsp;&nbsp;2.2 用户主体资格</p>
            <p>
              符合下列条件之一的自然人、法人或其他组织才能申请成为乐知帮会员并使用乐知帮的服务：
            </p>
            <p>
              &nbsp;&nbsp;&nbsp;&nbsp;（1）具有签订合同的完全民事权利能力及相应的民事行为能力；
            </p>
            <p>
              &nbsp;&nbsp;&nbsp;&nbsp;（2）根据中国法律年满14周岁，具备完全民事行为能力的自然人或根据本国法律具有完全民事行为能力的外国自然人。
            </p>
            <p>
              &nbsp;&nbsp;&nbsp;&nbsp;（3）无民事行为能力人、限制民事行为能力人应经其监护人同意并由该名监护人代表您成为会员。
            </p>
            <p>
              &nbsp;&nbsp;&nbsp;&nbsp;（4）根据中国或外国法律、法规、行政规章成立并合法存在的机关、企事业单位、社团组织和其他组织。未经批准设立的组织不能注册为乐知帮用户。
            </p>
            <p>
              &nbsp;&nbsp;2.3
              用户注册和使用乐知帮过程中，不得有下列行为及发布、传播内容：
            </p>
            <p>&nbsp;&nbsp;&nbsp;&nbsp;（1）违反宪法或法律法规规定的；</p>
            <p>
              &nbsp;&nbsp;&nbsp;&nbsp;（2）危害国家安全，泄露国家秘密，颠覆国家政权，破坏国家统一的；
            </p>
            <p>
              &nbsp;&nbsp;&nbsp;&nbsp;（3）损害国家荣誉和利益的，损害公共利益的；
            </p>
            <p>
              &nbsp;&nbsp;&nbsp;&nbsp;（4）煽动民族仇恨、民族歧视，破坏民族团结的；
            </p>
            <p>
              &nbsp;&nbsp;&nbsp;&nbsp;（5）破坏国家宗教政策，宣扬邪教和封建迷信的；
            </p>
            <p>
              &nbsp;&nbsp;&nbsp;&nbsp;（6）散布谣言，扰乱社会秩序，破坏社会稳定的；
            </p>
            <p>
              &nbsp;&nbsp;&nbsp;&nbsp;（7）散布淫秽、色情、赌博、暴力、凶杀、恐怖或者教唆犯罪的；
            </p>
            <p>
              &nbsp;&nbsp;&nbsp;&nbsp;（8）侮辱或者诽谤他人，侵害他人合法权益的；
            </p>
            <p>
              &nbsp;&nbsp;&nbsp;&nbsp;（9）含有法律、行政法规禁止的其他内容的。
            </p>
            <p>
              &nbsp;&nbsp;2.4
              用户注册账号时，承诺遵守法律法规、社会主义制度、国家利益、公民合法权益、公共秩序、社会道德风尚和信息真实性等七条底线。
            </p>
            <p>
              &nbsp;&nbsp;2.5
              如用户违反上述条款，乐知帮将有权同时：（1）立即停止传输该信息，拒绝发布或直接删除相关内容；（2）提出警示；（3）限制使用功能、暂停更新；（4）封禁或者关闭其账号；（5）保存有关记录,并及时向主管部门报告；（6）对于列入黑名单的用户，乐知帮有权禁止其重新注册。如因用户违反上述条款引发任何侵权纠纷或行政处罚，用户应负责处理并承担全部法律责任，如给乐知帮及其关联企业造成损失的，用户应承担全额赔偿责任。
            </p>
            <p>
              &nbsp;&nbsp;2.6
              根据国家规定的“后台实名、前台自愿”原则，您应当在注册时填写真实姓名（真实名称）、身份证号（营业执照号和组织机构代码证号或者统一商事登记号）等。
            </p>
            <p>
              &nbsp;&nbsp;2.7
              您注册的用户名不得使用禁止的词汇（包括但不限于：违法、不雅、敏感、政治词汇等），以及含有乐知帮、版主、管理员、平台等词汇。
            </p>
            <p>
              &nbsp;&nbsp;2.8
              您设置的用户名、头像、简介等信息不得侵犯或涉嫌侵犯他人的姓名权（名称权）、肖像权、名誉权、荣誉权等合法权益或包含及其他国家法律法规、公序良俗禁止、限制传播的文字及图片。
            </p>
            <p>&nbsp;&nbsp;2.9 用户不得冒用关联机构或社会名人注册账号。</p>
            <p>
              &nbsp;&nbsp;2.10
              您注册的用户名不符合上述规范的，乐知帮有权采取暂停使用、注销登记等措施，无需事先通知您，并有权向互联网信息内容主管部门报告。
            </p>
            <p>
              &nbsp;&nbsp;2.11
              用户名经注册后不得自行修改，除非该用户名不符合规范需要进行更正，由该用户申请并经乐知帮审核同意。
            </p>
            <p>
              &nbsp;&nbsp;2.12
              您填写的注册信息必须是真实、准确、及时和完整的；乐知帮有权驳回虚假、错误等不真实的会员注册申请，并责令会员及时修改后提交。
            </p>
            <p>
              &nbsp;&nbsp;2.13
              您应提供真实、准确的个人信息、简介资料，联系地址和联系电话，并不断更新注册资料，以符合真实、准确、及时、完整的要求。所有原始键入的资料将引用为注册资料。对于因注册信息不真实而引起的问题，以及该问题所带来的后果，乐知帮不负任何责任。
            </p>
            <p>
              &nbsp;&nbsp;2.14
              您注册的乐知帮帐号（即乐知帮用户ID）的所有权归乐知帮，您完成注册申请手续后，将获得乐知帮帐号的使用权。
            </p>
            <p>
              &nbsp;&nbsp;2.15
              您必须同意接受本协议及乐知帮其他规则、条款的约束；如您不能接受上述条件，您应立即停止注册程序。
            </p>
            <p>
              &nbsp;&nbsp;2.16
              用户未遵守本协议及乐知帮其他规则、条款，注册为乐知帮用户或超过其民事权利或行为能力范围从事交易的，该用户与乐知帮之间的服务协议自始无效。一经发现，乐知帮有权立即注销该用户，并追究其非法使用乐知帮“服务”的一切法律责任。
            </p>
            <p>第三条 用户的权利与义务</p>
            <p>
              &nbsp;&nbsp;3.1
              您有权根据本协议及发布的相关规则，利用平台发布信息、查询会员信息，在本平台社区及相关模块发布信息，参加本平台的有关活动及有权享受本平台提供的其他有关资讯及信息服务。
            </p>
            <p>
              &nbsp;&nbsp;3.2
              您须自行负责对您在本平台注册的用户名及密码保密，且有权根据需要更改登录和账户支付及提现密码，并对您在该用户名及密码下发生的所有活动（包括但不限于发布信息、评论、回复或购买视频服务等）承担责任。您同意：(a) 如发现任何人未经授权使用您的用户名和密码，或发生违反保密规定的任何其他情况，您会立即通知乐知帮；及 (b) 确保您在每个上网时段结束时，以正确步骤退出平台/服务。乐知帮不能也不会对因您未能遵守本协议而发生的任何损失负责。您理解乐知帮对您的请求采取行动需要合理时间，乐知帮对在采取行动前已经产生的后果（包括但不限于您的任何损失）不承担任何责任。
            </p>
            <p>
              &nbsp;&nbsp;3.3
              您应当向乐知帮提供真实准确的注册信息，包括但不限于真实姓名、联系电话、地址、电子邮箱、QQ或MSN、邮政编码等，保证乐知帮可以通过上述联系方式与您取得联系。同时，您也应当保证不以他人资料或虚假资料在乐知帮进行注册或身份认证，并在相关资料实际变更时及时更新有关注册资料。
            </p>
            <p>
              &nbsp;&nbsp;3.4
              您不得将帐号、密码通过转让、出租、出借、赠与、抵押、质押、留置等方式给予他人使用。因黑客行为或您的保管疏忽导致帐号、密码遭他人非法使用而造成的损失，乐知帮不承担任何责任。若您授权他人使用账户，应对被授权人在该账户下发生的所有行为负全部责任。
            </p>
            <p>
              &nbsp;&nbsp;3.5
              您不得在本平台发布国家法律、法规、行政规章规定禁止的信息、侵犯他人知识产权或其他合法权益的信息、违背社会公共利益或公共道德的信息。
            </p>
            <p>
              &nbsp;&nbsp;3.6
              您在本平台交易中应当遵守诚实信用原则，不得以发布侵权视频、虚假信息等不正当竞争方式扰乱网上交易秩序，不得从事与网上交易无关的不当行为。
            </p>
            <p>
              &nbsp;&nbsp;3.7
              您不得采取不正当手段（包括但不限于虚假交易、互换好评等方式）提高自身或他人信用度，或采用不正当手段恶意评价其他用户，降低其他用户的信用度。
            </p>
            <p>
              &nbsp;&nbsp;3.8
              您承诺使用乐知帮，须遵守中华人民共和国相关法律法规，包括但不限于《中华人民共和国计算机信息系统安全保护条例》、《计算机软件保护条例》、《中华人民共和国著作权法》及《信息网络传播权保护条例》等有关计算机互联网和知识产权的相关法律法规及相关规定等。如有违反导致任何法律后果的发生，您将以自己的名义独立承担相应的法律责任，乐知帮及关联方既不会单独，也不会共同、连带地对您的行为承担不利后果。
            </p>
            <p>
              &nbsp;&nbsp;3.9
              您在乐知帮网上交易过程中如与其他用户因交易产生纠纷，可以请求乐知帮从中予以协调处理。如发现其他用户有违法或违反本协议的行为，您可以向乐知帮反映并要求处理。但是，乐知帮不承诺、也不保证能够及时、顺利、圆满地处理该纠纷，实现您的诉求。如您因网上交易与其他用户产生诉讼的，您有权通过司法部门要求乐知帮提供相关资料。
            </p>
            <p>
              &nbsp;&nbsp;3.10
              未经本平台书面许可，您不得使用本平台的任何资料以及在交易平台上所展示的任何信息（包括但不限于以复制、修改、翻译等形式制作衍生作品、分发或公开展示）。
            </p>
            <p>
              &nbsp;&nbsp;3.11
              您不得使用以下方式登录平台或破坏平台所提供的服务：
            </p>
            <p>
              &nbsp;&nbsp;&nbsp;&nbsp;（1） 以任何机器人软件、蜘蛛软件、爬虫软件、刷屏软件或其它自动方式访问或登录本平台；
            </p>
            <p>
              &nbsp;&nbsp;&nbsp;&nbsp;（2） 通过任何方式对本平台内部结构造成或可能造成不合理或不合比例的重大负荷的行为；
            </p>
            <p>
              &nbsp;&nbsp;&nbsp;&nbsp;（3） 通过任何方式干扰或试图干扰平台的正常工作或平台上进行的任何活动。
            </p>
            <p>
              &nbsp;&nbsp;3.12
              您同意接收乐知帮通过电子邮箱、短信或者您注册登记的其他通讯方式向您发送账户动态，包括但不限于平台管理信息、更新信息、活动信息、交易信息、促销信息等。
            </p>
            <p>
              &nbsp;&nbsp;3.13
              您不得为任何非法目的而使用网络服务系统，遵守所有与网络服务有关的网络协议、规定和程序。
            </p>
            <p>
              &nbsp;&nbsp;3.14
              您不得利用乐知帮服务进行任何可能对互联网的正常运转造成不利影响的行为，不得利用乐知帮服务传输任何骚扰性的、中伤他人的、辱骂性的、恐吓性的、庸俗淫秽的或其他任何非法的信息资料，不得利用乐知帮服务进行任何不利于乐知帮或损害乐知帮利益的行为。
            </p>
            <p>第四条 乐知帮的权利义务</p>
            <p>
              &nbsp;&nbsp;4.1 乐知帮网络服务的具体内容由乐知帮根据实际情况提供。
            </p>
            <p>
              &nbsp;&nbsp;4.2
              乐知帮将在现有技术水平的基础上保证平台的正常运行，避免平台服务中断等情形出现，保障您合法的业务顺利进行。
            </p>
            <p>
              &nbsp;&nbsp;4.3
              乐知帮有权在乐知帮平台的任意位置、任意时间投放各种广告，但广告内容不得影响平台注册用户正常使用平台各项功能。
            </p>
            <p>
              &nbsp;&nbsp;4.4
              对于您在乐知帮平台上的不当行为或其它任何乐知帮认为应当终止服务的情况，乐知帮有权随时作出删除相关信息、终止服务提供等处理，而无须征得您的同意。
            </p>
            <p>
              &nbsp;&nbsp;4.5
              因网上平台的特殊性，乐知帮没有义务对所有用户的注册数据、所有的操作行为以及其它事项进行实质性审查。如存在下列情况，乐知帮有权无需征得用户的同意，可根据不同情况选择保留或删除相关信息、限制用户的活动、向用户核实有关情况、发出警告通知、暂时中止、终止及拒绝向该用户提供服务：
            </p>
            <p>
              &nbsp;&nbsp;&nbsp;&nbsp;（1）违反本服务协议及纳入本协议的其他规则的相关规定的；
            </p>
            <p>
              &nbsp;&nbsp;&nbsp;&nbsp;（2）用户或任何第三方通知乐知帮，认为某个用户信息、内容可能存在侵权或违规行为；
            </p>
            <p>
              &nbsp;&nbsp;&nbsp;&nbsp;（3）用户或任何第三方告知乐知帮平台上有违法或不当行为，并提供相应证据予以证明，而乐知帮无法联系到该用户进行核实并在本站首页公告30日内用户不与我站取得联系的，可以认定这些内容或行为具有违法或不当性质的。
            </p>
            <p>
              &nbsp;&nbsp;4.6
              当其他用户或者任何第三方认为您上传或者发表于乐知帮的内容、信息侵犯其权利，并根据相关法律规定向乐知帮发出停止侵权通知时，您同意乐知帮可以根据权利人提供或者乐知帮掌握的证据自行判断、决定是否删除涉嫌侵权的内容、信息。删除涉嫌侵权的信息之后，除非收到您提交给乐知帮不构成侵权的书面说明及相应证据，乐知帮将不会自动恢复已经删除的视频、信息。
            </p>
            <p>
              &nbsp;&nbsp;4.7
              经国家行政或司法机关的生效法律文书确认您存在违法或违约行为，或者乐知帮根据自身的判断，认为您的行为涉嫌违反法律法规的规定或涉嫌违反本协议和/或本平台其他规则条款的，乐知帮有权在本平台上公示您的该等涉嫌违法或违约行为及乐知帮已对您采取的措施，并有权随时作出删除相关信息、终止服务提供等处理。
            </p>
            <p>第五条 服务的变更、中断或终止</p>
            <p>
              &nbsp;&nbsp;5.1
              鉴于网络服务的特殊性，您同意乐知帮可自行决定在发出通知或不发出通知的情况下，随时变更、中断或终止部分或全部的网络服务。服务终止后，乐知帮没有义务为您保留原账户或与之相关的任何信息，或转发任何已阅读或发送，未曾阅读或发送的信息给用户或任何第三方。此外，您同意，如遇下列情形，乐知帮不就终止用户接入“服务”而对用户或任何第三方承担任何责任：
            </p>
            <p>
              &nbsp;&nbsp;&nbsp;&nbsp;（1）如变更、中断或终止的网络服务属于免费网络服务，乐知帮无需通知您，也无需对任何用户或任何第三方承担任何责任乐知帮乐知帮乐知帮。
            </p>
            <p>
              &nbsp;&nbsp;&nbsp;&nbsp;（2）如变更、中断或终止的网络服务涉及收费网络服务，乐知帮应当按照您实际使用相应收费网络服务的情况扣除相应服务费之后将剩余的服务费退还给您。
            </p>
            <p>
              &nbsp;&nbsp;5.2
              乐知帮需要定期或不定期地对提供网络服务的平台或相关的设备进行检修或者维护，如因此类情况而造成收费网络服务在合理时间内的中断，乐知帮无需为此承担任何责任，但乐知帮应尽可能事先进行通告。
            </p>
            <p>
              &nbsp;&nbsp;5.3
              您同意，乐知帮基于其自行之考虑，因任何正当理由，包含但不限于您长时间未使用，或乐知帮认为您已经违反本协议的条款及精神，无需进行事先通知即可中断或终止您的帐号、密码或本服务之使用（或服务之任何部分）。您承认并同意，乐知帮可立即关闭或删除您的帐号及帐号中所有相关信息及文件，及/或禁止继续使用前述文件或本服务。此外，您同意，若本服务之使用被中断或终止或您的帐号及相关信息和文件被关闭或删除，乐知帮对您或任何第三人均不承担任何责任。
            </p>
            <p>
              &nbsp;&nbsp;5.4
              如您注册的免费网络服务的帐号在任何连续180日内未实际使用，则乐知帮有权删除该帐号并停止为您提供相关的网络服务。
            </p>
            <p>
              &nbsp;&nbsp;5.5
              若您向本平台提出注销乐知帮注册会员身份，需经乐知帮审核同意，注销该注册会员，会员即解除与乐知帮的协议关系，但乐知帮仍保留下列权利：
            </p>
            <p>
              &nbsp;&nbsp;&nbsp;&nbsp;（1）乐知帮有权在法律、法规、规章规定的时间内保留该会员的资料,包括但不限于会员资料、操作记录等。
            </p>
            <p>
              &nbsp;&nbsp;&nbsp;&nbsp;（2）若会员注销前在乐知帮平台上存在违法行为或违反本协议的行为，乐知帮仍可行使本协议及相关规则所规定的权利，追究该会员的法律责任。
            </p>
            <p>
              &nbsp;&nbsp;5.6
              您存在下列情况，乐知帮可以通过注销用户账号的方式终止服务：
            </p>
            <p>
              &nbsp;&nbsp;&nbsp;&nbsp;（1）在您违反本协议及相关规则规定时，乐知帮有权终止向您提供服务。乐知帮将在终止服务时通知会员。但您在被乐知帮终止服务后，再一次直接或间接或以他人名义注册为乐知帮用户的，乐知帮有权再次单方面终止为您提供服务。
            </p>
            <p>
              &nbsp;&nbsp;&nbsp;&nbsp;（2 ）乐知帮发现您注册资料中的主要内容是虚假的，乐知帮有权随时终止为您提供服务。
            </p>
            <p>&nbsp;&nbsp;&nbsp;&nbsp;（3）其它乐知帮认为需终止服务的情况。</p>
            <p>第六条 隐私保护</p>
            <p>&nbsp;&nbsp;6.1 信息使用。</p>
            <p>
              &nbsp;&nbsp;&nbsp;&nbsp;（1）保护用户隐私是乐知帮的一项基本原则，乐知帮不对外公开或向任何第三方提供单个用户的注册资料及用户在使用网络服务时存储在乐知帮的非公开内容。
            </p>
            <p>
              &nbsp;&nbsp;&nbsp;&nbsp;（2）乐知帮不允许任何第三方以任何手段收集、编辑、出售或者无偿传播会员的信息。任何用户有本条所禁止的行为，一经发现，乐知帮有权立即终止与该用户的服务协议，查封、注销其账号。
            </p>
            <p>
              &nbsp;&nbsp;&nbsp;&nbsp;（3）在不对外透露单个用户隐私资料的前提下，乐知帮有权对整个用户数据库进行分析并对用户数据库的分析结果进行利用。
            </p>
            <p>
              &nbsp;&nbsp;&nbsp;&nbsp;（4）为服务用户的目的，乐知帮有权通过使用您的个人信息向您提供服务，包括但不限于向您发出产品和服务信息，或者与乐知帮合作伙伴共享信息以便于其向您发送有关其产品和服务的信息。
            </p>
            <p>&nbsp;&nbsp;6.2 信息披露。</p>
            <p>&nbsp;&nbsp;&nbsp;您的信息将在下述情况下部分或全部被披露：</p>
            <p>&nbsp;&nbsp;&nbsp;&nbsp;（1）事先获得您的明确授权；</p>
            <p>
              &nbsp;&nbsp;&nbsp;&nbsp;（2）若您是合法的权利人并发起投诉，应被投诉人要求，向被投诉人披露，以便双方处理可能的权利纠纷；
            </p>
            <p>
              &nbsp;&nbsp;&nbsp;&nbsp;（3）您出现违反中国法律、法规、规章、规定或者乐知帮规则的情况，需要向第三方披露；
            </p>
            <p>
              &nbsp;&nbsp;&nbsp;&nbsp;（4）根据法律的有关规定，或者行政、司法机关的要求，向第三方或者行政、司法机关披露；
            </p>
            <p>
              &nbsp;&nbsp;&nbsp;&nbsp;（5）为提供您所要求的产品和服务，而必须和第三方分享您的个人信息；
            </p>
            <p>
              &nbsp;&nbsp;&nbsp;&nbsp;（6）乐知帮可能会与第三方合作向您提供相关的网络服务，在该第三方同意承担与乐知帮同等的用户隐私权保护责任的情况下，您同意乐知帮向该第三方披露其注册信息及在乐知帮的其他资料等；
            </p>
            <p>
              &nbsp;&nbsp;&nbsp;&nbsp;（7）乐知帮根据法律或者本平台规定认为合适的披露。
            </p>
            <p>&nbsp;&nbsp;6.3 信息安全。</p>
            <p>
              &nbsp;&nbsp;&nbsp;&nbsp;（1）在使用本平台服务时，请您妥善保护自己的信息，如因您自行保管不善导致信息泄露，从而产生不良后果的，乐知帮不承担责任；
            </p>
            <p>
              &nbsp;&nbsp;&nbsp;&nbsp;（2） 如果您发现自己的信息泄密，尤其是注册账户、密码等，请您立即联络乐知帮客服，以便我们采取相应措施保护您的权益。
            </p>
            <p>&nbsp;&nbsp;6.4 Cookie的使用。</p>
            <p>
              &nbsp;&nbsp;&nbsp;&nbsp;（1）在您未拒绝接受cookies的情况下，乐知帮会在您的计算机或者终端设备上设定或取用cookies，以便您能登录或使用依赖于cookies的乐知帮络服务或功能。乐知帮使用cookies可为您提供更加周到的个性化服务，包括推广服务。
            </p>
            <p>
              &nbsp;&nbsp;&nbsp;&nbsp;（2）您有权选择接受或拒绝接受cookies。您可以通过修改浏览器设置或者终端配置的方式拒绝接受cookies。但如果您选择拒绝接受cookies，则您可能无法登录或使用依赖于cookies的乐知帮服务或功能。
            </p>
            <p>
              &nbsp;&nbsp;&nbsp;&nbsp;（3）通过乐知帮所设cookies所取得的有关信息，将适用本协议隐私保护条款。
            </p>
            <p>第七条 免责声明</p>
            <p>
              &nbsp;&nbsp;7.1
              乐知帮对您在任何公共论坛、个人主页或其它互动区域提供的任何陈述、声明或内容均不承担责任。您在乐知帮上发表的任何言论均不代表乐知帮的观点或立场，乐知帮对您或任何第三方发布、存储或上传的任何内容或因其引起的任何损失或损害，均不承担责任。对您可能遇到的任何错误、中伤、诽谤、诬蔑、不作为、谬误、淫秽、色情或亵渎，乐知帮也不承担责任。
            </p>
            <p>
              &nbsp;&nbsp;7.2
              乐知帮不担保网络服务一定能满足您的要求，也不担保网络服务不会中断，对网络服务的及时性、安全性、准确性也都不作担保。
            </p>
            <p>
              &nbsp;&nbsp;7.3
              乐知帮不保证为向您提供便利而设置的外部链接的准确性和完整性，同时，对于该等外部链接指向的不由乐知帮实际控制的任何网页上的内容，乐知帮不承担任何责任。
            </p>
            <p>
              &nbsp;&nbsp;7.4
              对于因不可抗力或乐知帮不能控制的原因造成的网络服务中断或其它缺陷，乐知帮不承担任何责任，但将尽力减少因此而给您造成的损失和影响。
            </p>
            <p>
              &nbsp;&nbsp;7.5
              您同意，对于乐知帮向您提供的下列产品或者服务的质量缺陷本身及其引发的任何损失，乐知帮无需承担任何责任：
            </p>
            <p>
              &nbsp;&nbsp;&nbsp;&nbsp;（1）乐知帮向您免费提供的各项网络服务；
            </p>
            <p>
              &nbsp;&nbsp;&nbsp;&nbsp;（2）乐知帮向您赠送的任何产品或者服务；
            </p>
            <p>
              &nbsp;&nbsp;&nbsp;&nbsp;（3）乐知帮向收费网络服务用户附赠的各种产品或者服务。
            </p>
            <p>第八条 知识产权</p>
            <p>
              &nbsp;&nbsp;8.1
              乐知帮及乐知帮所使用的任何相关软件、程序、内容，包括但不限于作品、图片、档案、资料、平台构架、平台版面的布局、网页设计、经由乐知帮或广告商向您呈现的广告或资讯，均由乐知帮或其它权利人依法享有相应的知识产权及其他权利，包括但不限于著作权、商标权、专利权或其它专属权利等，受到相关法律的保护。未经乐知帮或权利人书面明示授权，您不得以修改、出租、出借、出售、散布等方式使用乐知帮及乐知帮所使用的上述任何作品和资源，或根据上述作品和资源制作成任何种类产品。
            </p>
            <p>
              &nbsp;&nbsp;8.2
              乐知帮授予您对本平台提供的软件不可转让及非专属的使用权，使您可以通过单机计算机使用本平台的目标代码（以下简称“软件”），但您不得允许任何任何第三方复制、修改、创作衍生作品、进行反向工程、反向组译，或以其它方式破译或试图破译源代码，或出售、转让“软件”或对“软件”进行再授权，或以其它方式移转“软件”之任何权利。您同意不以任何方式修改“软件”，或使用修改后的“软件”。
            </p>
            <p>
              &nbsp;&nbsp;8.3
              您不得经由非本平台所提供的界面使用本平台，不得在除本平台以外的平台上对本平台建立镜像。
            </p>
            <p>
              &nbsp;&nbsp;8.4
               只要您接受本服务协议并完成注册后使用本平台提供的服务，即表明您愿意主动将您在任何时间段在本站发表的任何形式的作品的著作财产权，包括并不限于：复制权、发行权、出租权、展览权、表演权、放映权、广播权、信息网络传播权、摄制权、改编权、翻译权、汇编权，以及应当由著作权人享有的其他可转让权利无偿独家转让给乐知帮所有，同时表明您许可乐知帮有权就任何主体侵权而单独提起诉讼，并获得全部赔偿。本协议已经构成《著作权法》第二十五条所规定的书面协议，其效力及于您在乐知帮发布的任何受著作权法保护的作品内容，无论该内容形成于本协议签订前还是本协议签订后。您同意并明确了解上述条款，不将已发表于本站的信息，以任何形式发布或授权其它平台（及媒体）使用。
            </p>
            <p>第九条 通知送达</p>
            <p>
              &nbsp;&nbsp;本协议项下，乐知帮对于用户所有的通知均可通过平台公告、乐知帮站内消息、电子邮件、手机短信或常规的信件传送等方式中的任何一种进行，且均于发送成功之时视为已送达收件人。
            </p>
            <p>第十条 不可抗力</p>
            <p>
              &nbsp;&nbsp;因不可抗力或者其他意外事件，使得本协议的履行不可能、不必要或者无意义的，双方均不承担责任。本协议所称之不可抗力是指双方不能控制、不可预见或及时预见亦无法避免的事件（包括但不限于政府行为、自然灾害、黑客攻击、病毒感染、第三方服务故障、网络平台及平台软件服务器崩溃、电信部门技术管制、战争或任何其他类似事件），该事件妨碍、影响或延误一方根据本协议履行其全部或部分义务。
            </p>
            <p>第十一条 保密</p>
            <p>
              &nbsp;&nbsp;您对讨论、签订、执行本协议中所获悉的属于对方的、且无法自公开渠道获得的文件及资料（包括但不限于商业秘密、公司计划、运营活动、财务信息、技术信息、经营信息及其他商业秘密）予以保密。未经该资料和文件的原提供方同意，不得向第三方泄露该文件资料的全部或者部分内容。但法律、法规、规章另有规定或者双方另有约定的除外。
            </p>
            <p>第十二条 争议解决</p>
            <p>
              &nbsp;&nbsp;12.1
              本协议及其规则的有效性、履行及争议解决等所有事宜，均适用中华人民共和国法律法规及相关规定。
            </p>
            <p>
              &nbsp;&nbsp;12.2
              就本协议及协议所附规则的内容或其执行发生任何争议，应尽量友好协商解决；协商不成时，均应向乐知帮所在地人民法院提起诉讼。
            </p>
            <p>
              &nbsp;&nbsp;12.3
              乐知帮有权受理并调处您与其他用户因交易服务产生的争议，同时有权单方面以非专业交易者的知识水平标准独立判断其他会员对您的投诉及索偿是否成立。若本平台判断索偿成立，则本平台有权使用您账户内未提现的金额进行相应偿付。本平台没有使用自用资金进行偿付的义务，但若进行了该等支付，您应及时赔偿本平台的全部损失，否则本平台有权通过前述方式抵减相应资金或权益，如仍无法弥补损失，则本平台保留继续追偿的权利。因本平台非司法机关，您完全理解并承认，本平台对证据的鉴别能力及对纠纷的处理能力有限，受理交易争议完全是基于您之委托，不保证争议处理结果符合您的期望。本平台有权决定是否参与争议的调处。
            </p>
            <p>第十三条 附 则</p>
            <p>
              &nbsp;&nbsp;13.1
              在本协议中所使用的下列词语，除非另有定义，应具有以下含义：
            </p>
            <p>
              &nbsp;&nbsp;13.1.1“本平台”在无特别说明的情况下，均指“乐知帮”。
            </p>
            <p>
              &nbsp;&nbsp;13.1.2“用户”： 指具有完全民事行为能力的乐知帮各项服务的使用者。
            </p>
            <p>
              &nbsp;&nbsp;13.1.3 “会员”： 指与乐知帮签订《乐知帮服务协议》并完成注册流程的用户。
            </p>
          </div>
          <div class="privacy-agreement" v-if="agreeIndex === 2">
            <p>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;乐知帮尊重并保护所有使用服务用户的个人隐私权。为了给您提供更准确、更个性化的服务，乐知帮根据现行法规及政策，制定本隐私权政策，并会按照本隐私权政策的规定使用和披露您的个人信息，但乐知帮将以高度的勤勉、审慎义务对待这些信息。除本隐私权政策另有规定外，在未征得您事先许可的情况下，乐知帮不会将这些信息对外披露或向第三方提供。乐知帮将不时更新本隐私权政策。您在同意乐知帮服务使用协议之时，即视为您已经同意本隐私权政策全部内容。本隐私权政策属于乐知帮服务使用协议不可分割的一部分。
            </p>
            <p>1. 适用范围</p>
            <p>
              &nbsp;&nbsp;1)
              在您使用乐知帮网络服务，或访问乐知帮平台时，乐知帮自动接收并记录的您的终端信息，包括但不限于您的客户端版本、IP地址、使用的语言、浏览器类型、访问日期和时间、使用语言、软硬件特征信息及您需求的网页记录等数据。
            </p>
            <p>&nbsp;&nbsp;2) 乐知帮通过其他合法来源取得的用户个人数据。</p>
            <p>&nbsp;&nbsp;3) 您了解并同意，以下信息不适用本隐私权政策：</p>
            <p>
              &nbsp;&nbsp;&nbsp;&nbsp;>
              您在使用乐知帮平台提供的搜索服务时输入的关键字信息；
            </p>
            <p>
              &nbsp;&nbsp;&nbsp;&nbsp;>
              信用评价、违反法律规定或违反乐知帮平台规则的行为及乐知帮已对您采取的措施；
            </p>
            <p>
              &nbsp;&nbsp;&nbsp;&nbsp;>
              应法律法规要求需公示的企业名称等相关工商注册信息以及自然人经营者的信息。
            </p>
            <p>2. 信息使用</p>
            <p>
              &nbsp;&nbsp;1)
              除下列情况外，乐知帮不会向任何无关第三方提供、出售、出租、分享或交易您的个人信息：
            </p>
            <p>&nbsp;&nbsp;&nbsp;&nbsp;> 事先得到您的许可或授权；</p>
            <p>
              &nbsp;&nbsp;&nbsp;&nbsp;>
              该第三方和乐知帮（含关联公司）单独或共同为您提供服务，且在该服务结束后，该第三方将被禁止访问包括其以前能够访问的所有这些资料；
            </p>
            <p>
              &nbsp;&nbsp;&nbsp;&nbsp;>
              根据法律法规的规定或行政或司法机构的要求；
            </p>
            <p>
              &nbsp;&nbsp;&nbsp;&nbsp;>
              您出现违反中国人民共和国有关法律、法规或者乐知帮相关服务协议或相关规则的情况下，需向第三方披露；
            </p>
            <p>
              &nbsp;&nbsp;&nbsp;&nbsp;>
              如您是适格的知识产权投诉人并已提起投诉，应被投诉人要求，向被投诉人披露，以便双方处理可能的权利纠纷。
            </p>
            <p>
              &nbsp;&nbsp;2)
              乐知帮亦不允许任何第三方以任何手段收集、编辑、出售或者无偿传播您的个人信息。任何乐知帮平台用户如从事上述活动，一经发现，乐知帮有权立即终止与该用户的服务协议。
            </p>
            <p>
              &nbsp;&nbsp;3)
              为服务用户的目的，乐知帮可能通过使用您的个人信息，向您提供您感兴趣的信息，包括但不限于向您发出产品和服务信息，或者与乐知帮合作伙伴共享信息以便他们向您发送有关其产品和服务的信息（后者需要您的事先同意）。
            </p>
            <p>3. 信息披露</p>
            <p>
              &nbsp;&nbsp;在如下情况下，乐知帮将依据您的个人意愿或法律的规定全部或部分的披露您的个人信息：
            </p>
            <p>&nbsp;&nbsp;1) 经您事先同意，向第三方披露；</p>
            <p>
              &nbsp;&nbsp;2)
              为提供您所要求的产品和服务，而必须和第三方分享您的个人信息；
            </p>
            <p>
              &nbsp;&nbsp;3)
              根据法律的有关规定，或者行政或司法机构的要求，向第三方或者行政、司法机构披露；
            </p>
            <p>
              &nbsp;&nbsp;4)
              如您出现违反中国有关法律、法规或者乐知帮服务协议或相关规则的情况，需要向第三方披露；
            </p>
            <p>
              &nbsp;&nbsp;5)
              如您是适格的知识产权投诉人并已提起投诉，应被投诉人要求，向被投诉人披露，以便双方处理可能的权利纠纷；
            </p>
            <p>
              &nbsp;&nbsp;6)
              其它乐知帮根据法律、法规或者网站相关政策认为合适的披露。
            </p>
            <p>4. 信息存储和交换</p>
            <p>
              &nbsp;&nbsp;乐知帮收集的有关您的信息和资料将保存在乐知帮及（或）其关联公司的服务器上，这些信息和资料可能传送至您所在国家、地区或乐知帮收集信息和资料所在地的境外并在境外被访问、存储和展示。
            </p>
            <p>5. 信息安全</p>
            <p>
              &nbsp;&nbsp;1)
              乐知帮帐号均有安全保护功能，请妥善保管您的用户名及密码信息。乐知帮将通过对用户密码进行加密等安全措施确保您的信息不丢失，不被滥用和变造。尽管有前述安全措施，但同时也请您注意在信息网络上不存在“完善的安全措施”。
            </p>
            <p>
              &nbsp;&nbsp;2)
              在使用乐知帮网络服务进行网上交易时，请您妥善保护自己的个人信息，仅在必要的情形下向他人提供。如您发现自己的个人信息泄密，尤其是乐知帮用户名及密码发生泄露，请您立即联络乐知帮客服，以便乐知帮采取相应措施。
            </p>
          </div>
        </div>
        <button @click="agree_read" class="read_btn">我已阅读</button>
      </div>
    </div>
    <!--反馈建议-->
    <div class="feedback-message-wrap" v-if="showDialog_message">
      <div class="feedback-message-wrap-dialog">
        <div class="feedback-message-wrap-dialog-header">
          <span>用户反馈</span>
          <img src="../../assets/close.png" alt="" @click="close_msg_dialog" />
        </div>
        <div class="textarea-input">
          <el-input
            type="textarea"
            :rows="9"
            auto-complete="on"
            placeholder="请输入您的意见"
            maxlength="200"
            autofocus="true"
            tabindex="2"
            v-model="textarea"
          >
          </el-input>
          <span class="el-span"
            >{{ minlength }}&nbsp;/&nbsp;{{ maxlength }}</span
          >
        </div>
        <button @click="send_msg">发送</button>
      </div>
    </div>
  </div>
</template>

<script>
import { VueCropper } from 'vue-cropper'
import localforage from 'localforage'

var eye = require('@/assets/eye.png')
var c_eye = require('@/assets/close-eye.png')
const phoneRexp = /^1\d{10}$/
const patrn = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,16}$/
export default {
  components: { VueCropper },
  data() {
    return {
      value: this.$store.state.userInfo.textbookName,
      //图片裁剪配置项
      dialogVisible: false,
      headImg: '',
      crap: false,
      previews: {},
      option: {
        img: '',
        outputSize: 1, //剪切后的图片质量（0.1-1）
        full: false, //输出原图比例截图 props名full
        outputType: 'png',
        canMove: true,
        original: false,
        canMoveBox: true,
        autoCrop: true,
        autoCropWidth: 150,
        autoCropHeight: 150,
        fixedBox: true
      },
      modelSrc: '',
      fileName: '', //本机文件地址
      downImg: '#',
      imgFile: '',
      uploadImgRelaPath: '', //上传后的图片的地址（不带服务器域名）
      isShowPic: true,

      //控制确认密码是否显示
      confirm_imgUrl: c_eye,
      confirm_inputType: 'password',
      confirm_flag: true,
      //控制新密码是否显示
      new_imgUrl: c_eye,
      new_inputType: 'password',
      new_flag: true,
      //控制原始密码是否显示
      old_imgUrl: c_eye,
      old_inputType: 'password',
      old_flag: true,

      //控制修改密码 和 手机号，协议弹窗的显示和隐藏,反馈建议
      showDialog_pas: false,
      showDialog_tel: false,
      showDialog_agree: false,
      showDialog_cropper: false,
      showDialog_message: false,
      //修改密码
      old_tel: '',
      vcode_pas: '',
      new_pas: '',
      confirm_pas: '',
      //修改手机号
      old_pas: '',
      new_tel: '',
      vcode_tel: '',

      //文本域
      textarea: '',
      minlength: 0,
      maxlength: 200,
      //验证码
      countDown: 60,
      isGetCode: true,

      agreeIndex: 1, //协议切换控制的index

      clock: null, //倒计时

      teacherInfos: {}, //老师信息

      bookList: [], //课本列表
      defaultTextbookName: '', //默认课本名字
      textbookId: '' //当前课本id
    }
  },
  created() {
    this.teacherInfos = this.$store.state.userInfo
    if (
      this.teacherInfos.userHadportraitPath === '' ||
      this.teacherInfos.userHadportraitPath === undefined
    ) {
      this.isShowPic = false
    } else {
      this.isShowPic = true
    }
  },
  mounted() {
    this.old_tel = this.teacherInfos.teacherPhonenum
    this.getBook(this.teacherInfos.teacherId)
  },
  watch: {
    textarea(val) {
      this.minlength = parseInt(val.length) > 200 ? 200 : parseInt(val.length)
      this.maxlength =
        200 - parseInt(val.length) < 0 ? 0 : 200 - parseInt(val.length)
    }
  },
  methods: {
    //课本的切换
    bookChange(val) {
      this.value = val
      let obj = {}
      obj = this.bookList.find(item => {
        return item.textbookName === val //筛选出匹配数据
      })
      this.$http
        .post('/api/teacher/updateUseTextBook', {
          teacherId: this.$store.state.userInfo.teacherId,
          textbookId: obj.textbookId,
          textbookName: obj.textbookName,
          textbookRegisterId: this.$store.state.userInfo.textbookRegisterId,
          textbookRegisterName: this.$store.state.userInfo.textbookRegisterName,
          textbookTeachingmateriaId: this.$store.state.userInfo
            .textbookTeachingmateriaId,
          textbookTeachingmateriaName: this.$store.state.userInfo
            .textbookTeachingmateriaName
        })
        .then(res => {
          if (res.data.flag == 1) {
            this.$store.state.userInfo = {
              ...this.$store.state.userInfo,
              textbookId: obj.textbookId,
              textbookName: obj.textbookName
            }
            this.$store.commit('GETUSERINFO', this.$store.state.userInfo)
            localStorage.setItem(
              'userInfo',
              JSON.stringify(this.$store.state.userInfo)
            )
            localforage
              .setItem('userInfo', this.$store.state.userInfo)
              .then(() => {})
          }
        })
    },

    //清楚输入框内容方法
    clear_val(t) {
      switch (t) {
        case 1:
          this.old_tel = ''
          break
        case 2:
          this.vcode_pas = ''
          break
        case 3:
          this.new_pas = ''
          break
        case 4:
          this.confirm_pas = ''
          break
        case 5:
          this.old_pas = ''
          break
        case 6:
          this.new_tel = ''
          break
        case 7:
          this.vcode_tel = ''
          break
      }
    },

    //反馈建议弹框
    show_mag_dialog() {
      this.showDialog_message = true
    },
    close_msg_dialog() {
      this.showDialog_message = false
    },
    //密码弹框方法
    show_pas_dialog() {
      this.showDialog_pas = true
    },
    close_pas_dialog() {
      this.showDialog_pas = false
      this.new_pas = ''
      this.confirm_pas = ''
      this.vcode_pas = ''
      clearInterval(this.clock)
      this.countDown = 60
      this.isGetCode = true
    },

    //协议弹框方法
    show_agree_dialog() {
      this.showDialog_agree = true
    },
    close_agree_dialog() {
      this.showDialog_agree = false
    },
    agree_read() {
      this.showDialog_agree = false
    },
    agreementTap(i) {
      this.agreeIndex = i
    },

    //手机弹框方法
    show_tel_dialog() {
      this.showDialog_tel = true
    },
    close_tel_dialog() {
      this.showDialog_tel = false
      this.new_tel = ''
      this.vcode_tel = ''
      this.old_pas = ''
      clearInterval(this.clock)
      this.countDown = 60
      this.isGetCode = true
    },

    //修改密码确认
    modify_pas() {
      if (this.old_tel === '') {
        this.$message.error('手机号不能为空')
        return false
      }
      if (!phoneRexp.test(this.old_tel)) {
        this.$message.error('手机号格式有误')
        return false
      }
      if (this.vcode_pas === '') {
        this.$message.error('请输入验证码')
        return false
      }
      if (this.new_pas === '') {
        this.$message.error('请输入新密码')
        return false
      }
      if (!patrn.test(this.new_pas)) {
        this.$message.error('密码为8-16位，字母数字组合')
        return false
      }
      if (this.confirm_pas === '') {
        this.$message.error('请输入确认密码')
        return false
      }
      if (this.confirm_pas != this.new_pas) {
        this.$message.error('两次密码不一致')
        return false
      }
      this.$http
        .post('/api/teacher/updatePassword', {
          code: this.vcode_pas,
          isInit: '',
          password: this.new_pas,
          phone: this.old_tel,
          teacherId: this.teacherInfos.teacherId,
          typeNum: '5'
        })
        .then(res => {
          if (res.data.flag === 1) {
            this.$message.success('密码修改成功')
            var self = this
            setTimeout(function() {
              self.$store.dispatch('LogOut')
            }, 1000)
          } else {
            this.$message.error(res.data.message)
          }
        })
    },

    //修改手机号确认
    modify_tel() {
      var self = this
      if (this.old_pas === '') {
        this.$message.error('原密码不能为空')
        return false
      }
      if (this.new_tel === '') {
        this.$message.error('请输入新手机号')
        return false
      }
      if (!phoneRexp.test(this.new_tel)) {
        this.$message.error('手机号格式有误')
        return false
      }
      if (this.vcode_tel === '') {
        this.$message.error('请输入验证码')
        return false
      }
      this.$http
        .post('/api/teacher/updatePhone', {
          code: this.vcode_tel,
          phone: this.new_tel,
          teacherId: this.teacherInfos.teacherId,
          typeNum: '3',
          password: this.old_pas
        })
        .then(res => {
          if (res.data.flag === 1) {
            this.$message.success('手机号修改成功')
            setTimeout(function() {
              self.$store.dispatch('LogOut')
            }, 1000)
          } else {
            this.$message.error(res.data.message)
          }
        })
    },

    send_msg() {
      if (this.textarea === '') {
        this.$message.error('反馈建议不能为空')
        return false
      }
      this.$http
        .post('/api/teacher/insertFeedBack', {
          feedbackInfo: this.textarea,
          schoolId: this.$store.state.userInfo.schoolId,
          schoolName: this.$store.state.userInfo.schoolName,
          userId: this.$store.state.userInfo.teacherId,
          userName: this.$store.state.userInfo.teacherName
        })
        .then(res => {
          if (res.data.flag === 1) {
            this.showDialog_message = false
            this.$message.success('提交成功')
          } else {
            this.$message.error(res.data.message)
          }
        })
        .catch()
    },

    //密码是否显示方法
    hid_password(t) {
      switch (t) {
        case 1:
          if (this.new_flag) {
            this.new_imgUrl = eye
            this.new_inputType = 'text'
            this.new_flag = !this.new_flag
          } else {
            this.new_imgUrl = c_eye
            this.new_inputType = 'password'
            this.new_flag = !this.new_flag
          }
          break
        case 2:
          if (this.confirm_flag) {
            this.confirm_imgUrl = eye
            this.confirm_inputType = 'text'
            this.confirm_flag = !this.confirm_flag
          } else {
            this.confirm_imgUrl = c_eye
            this.confirm_inputType = 'password'
            this.confirm_flag = !this.confirm_flag
          }
          break
        case 3:
          if (this.old_flag) {
            this.old_imgUrl = eye
            this.old_inputType = 'text'
            this.old_flag = !this.old_flag
          } else {
            this.old_imgUrl = c_eye
            this.old_inputType = 'password'
            this.old_flag = !this.old_flag
          }
          break
      }
    },

    getBook(id) {
      this.$http
        .get('/api/teacher/getTextBook', {
          params: {
            teacherId: id
          }
        })
        .then(res => {
          if (res.data.flag === 1) {
            this.bookList = res.data.infos
            for (var i = 0; i < this.bookList.length; i++) {
              if (
                this.teacherInfos.textbookId === this.bookList[i].textbookId
              ) {
                this.defaultTextbookName = this.bookList[i].textbookName
              }
            }
          }
        })
        .catch()
    },

    //获取验证码
    getPhoneCode(m) {
      if (m === 'phone') {
        if (this.old_pas === '') {
          this.$message.error('原密码不能为空')
          return false
        }
        this.$http
          .get('/teacherApi/teacher/passwordIsTrue', {
            params: {
              password: this.old_pas,
              userName: this.old_tel
            }
          })
          .then(res => {
            if (res.data.flag === 1) {
              if (this.new_tel === '') {
                this.$message.error('请输入新手机号')
                return false
              }
              if (!phoneRexp.test(this.new_tel)) {
                this.$message.error('手机号格式有误')
                return false
              }
              this.sendsms(this.new_tel, 3)
            } else {
              this.$message.error(res.data.message)
            }
          })
          .catch()
      } else {
        this.sendsms(this.old_tel, 5)
      }
    },

    //发送验证码
    sendsms: function(p, t) {
      //连接服务器进行获取验证码操作
      this.$http
        .get('/api/sms/sendSms', {
          params: {
            phoneNum: p,
            smsType: 't',
            typeNum: t
          }
        })
        .then(res => {
          if (res.data.flag === 1) {
            this.isGetCode = false
            this.timer()
            this.$message.success(res.data.infos)
          } else {
            this.$message.error(res.data.message)
          }
        })
        .catch()
    },

    //倒计时
    timer() {
      //验证码倒计时
      let self = this
      let countDown = self.countDown
      self.clock = setInterval(() => {
        countDown--
        if (countDown >= 0) {
          self.countDown = countDown
        } else {
          clearInterval(self.clock)
          self.countDown = 60
          self.isGetCode = true
        }
      }, 1000)
    },

    //图片加载
    imgload() {
      this.showDialog_cropper = true
      if (this.option.img != '') {
        setTimeout(function() {
          document.getElementsByClassName('crop-info')[0].style.display = 'none'
        })
      }
    },

    //保存修剪
    finish(type) {
      var self = this
      if (self.option.img != '') {
        if (type === 'base') {
          this.$refs.cropper.getCropData(data => {
            self.modelSrc = data
            this.$http
              .post('/teacherApi/upload/uploadHead', {
                teacherId: self.teacherInfos.teacherId,
                file: self.modelSrc.split(',')[1]
              })
              .then(res => {
                if (res.data.message === 'SUCCESS') {
                  this.teacherInfos.userHadportraitPath = res.data.infos[1]
                  if (this.teacherInfos.userHadportraitPath != '') {
                    this.isShowPic = true
                  } else {
                    this.isShowPic = false
                  }
                  this.showDialog_cropper = false
                  this.option.img = ''
                  this.$message.success('上传成功')
                  this.$store.commit('UPDATEUSERINFO', {
                    userHadportraitPath: res.data.infos[1]
                  })
                }
              })
              .catch()
          })
        }
      }
    },

    //时时预览
    realTime(data) {
      this.previews = data
    },

    //选择图片
    uploadImg(e) {
      var self = this
      var file = e.target.files[0]
      self.fileName = file.name
      if (!/\.(gif|jpg|jpeg|png|bmp|GIF|JPG|PNG)$/.test(e.target.value)) {
        return false
      }
      var reader = new FileReader()
      reader.onload = e => {
        let data
        if (typeof e.target.result === 'object') {
          data = window.URL.createObjectURL(new Blob([e.target.result]))
        } else {
          data = e.target.result
        }
        self.option.img = data
        if (self.option.img != '') {
          setTimeout(function() {
            // document.getElementsByClassName('crop-info')[0].style.display =
            //   'none'
          })
        }
      }
      // 转化为base64
      reader.readAsDataURL(file)
    },

    cancelCrop() {
      //关闭
      this.showDialog_cropper = false
      this.option.img = ''
    },
    modify_() {}
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import '@/styles/variable.scss';

.el-select {
  width: 60%;
}
.el-select .el-input__inner {
  border-radius: 0 !important;
  height: 35px;
}
.personal-wrap {
  @include wh(100%, 100%);
  background: #f0f7ff;
  .personal-banner {
    background: url(../../assets/p-logo.png) no-repeat center;
    @include wh(100%, 200px);
    @include fj(center);
    align-items: center;
    img {
      @include wh(120px, 120px);
      #{$attr}-radius: 50%;
    }
  }

  .personal-editors {
    @include wh(1100px, auto);
    background: #fff;
    margin: 20px auto 0;
    overflow: hidden;
    padding-bottom: 20px;
    .personal-editors-top {
      @include wh(1000px, auto);
      @include fj();
      margin: 10px auto 0;
      flex-wrap: wrap;
      > div {
        @include wh(350px, 65px);
        margin-top: 15px;
        @include fj();
        flex-flow: column;
        #{$attr}-bottom: 1px solid #eff4f8;
        padding-bottom: 5px;
        label {
          @include sc(14px, #aaa);
        }
        span {
          @include sc(14px, #333);
        }
        .modify-tel-w {
          @include fj();
          align-items: center;
          span:nth-of-type(1) {
            width: 85%;
          }
        }
        .modify-tel {
          @include sc(14px, #2f43ab);
          cursor: pointer;
        }
        .modify-tel-btn {
          @include wh(7px, 12px);
          background: url(../../assets/youjian.png) no-repeat center;
          background-size: 100% 100%;
          cursor: pointer;
        }
      }
      > div:nth-of-type(4) {
        height: auto;
      }
      > div:nth-of-type(5) {
        #{$attr}-bottom: 0;
      }
      > div:nth-of-type(6) {
        #{$attr}-bottom: 0;
      }
      .gradeClassname {
        display: block;
        float: left;
        margin-right: 10px;
        margin-top: 5px;
      }
    }
    .personal-editors-bottom {
      label {
        @include sc(14px, #aaa);
      }
      margin: 20px auto 0;
      @include wh(1000px, 140px);
      div {
        @include wh(100%, 110px);
        .div {
          @include wh(98px, 110px);
        }
        a {
          display: inline-block;
          @extend .div;
          @include mg(15px, 0, 0, 110px);
          @include fj();
          flex-flow: column;
          align-items: center;
          float: left;
        }
        img {
          @include wh(78px, 78px);
        }
        a:nth-of-type(1) {
          margin-left: 0px;
        }
      }
    }
  }
  .v-upload-wrap {
    @include wh(100%, 100%);
    background: rgba(0, 0, 0, 0.5);
    position: fixed;
    left: 0;
    top: 0;
    z-index: 99;
    margin: auto;

    .v-upload-wrap-croppers {
      @include wh(600px, 430px);
      position: absolute;
      left: 0;
      top: 0;
      right: 0;
      bottom: 0;
      margin: auto;
      background: #fff;
      z-index: 99;
      border-radius: 10px;
      overflow: hidden;

      .dialog-footer {
        @include wh(78%, auto);
        margin: 0 auto;
        @include fj();

        .el-button {
          @include sc(18px, #aaa);
          border: 1px solid #ddd;
          background: none;
          @include wh(180px, 60px);
        }

        .el-button:nth-of-type(2) {
          @include sc(18px, #fff);
          background: #3298fe;
          border: 0;
        }
      }

      .v-img-cropper {
        margin: 80px auto 0;
        @include wh(90%, 200px);
        background: #7e7e7e;
        overflow: auto;

        .v-default-cropper {
          @include wh(160px, 160px);
          border: 2px dashed #999;
          background: #fff;
          margin: 20px auto 0;
        }
      }

      .cropper-container {
        width: 100% !important;
        height: 100% !important;
      }

      .v-upload-wrap-t {
        @include wh(100%, 60px);
        text-indent: 30px;
        line-height: 60px;
        @include sc(18px, #586878);
        background: rgba(243, 245, 248, 1);
      }

      .v-pre-img {
        @include wh(115px, 36px);
        background: #bad5ee;
        text-align: center;
        #{$l}: 36px;
        @include sc(12px, #1059ff);
        border-radius: 5px;
        float: left;
        @include mg(20px, 6px, 19px, 30px);
        position: relative;
        cursor: pointer;

        input {
          opacity: 0;
          position: absolute;
          left: 0;
          top: 0;
          cursor: pointer;
          @include wh(115px, 36px);
        }
      }

      .v-img-gs {
        @include sc(12px, #aaa);
        float: left;
        @include mg(25px, 0, 0, 0);
      }
    }

    button {
      display: block;
      @include wh(180px, 44px);
      @include sc(14px, #1059ff);
      float: right;
      background: #fff;
      border: 1px solid rgba(16, 89, 255, 1);
      box-shadow: 0px 3px 4px 0px rgba(16, 89, 255, 0.27);
      border-radius: 22px;
      outline: none;
      margin-top: 20px;
    }
    button:nth-of-type(2) {
      @include sc(14px, #fff);
      background: #1059ff;
    }
  }
  .modify-pas-dialog-wrap {
    @include wh(100%, 100%);
    background: rgba(0, 0, 0, 0.4);
    position: fixed;
    left: 0;
    top: 0;
    z-index: 999;
    @include fj(center);
    align-items: center;
    .modify-pas-dialog {
      @include wh(600px, 450px);
      background: #fff;
      #{$attr}-radius: 10px;
      overflow: hidden;
      .modify-pas-dialog-header {
        @include wh(100%, 60px);
        @include fj();
        align-items: center;
        background: rgba(243, 245, 248, 1);
        margin-bottom: 28px;
        span {
          margin-left: 20px;
          @include sc(18px, #586878);
        }
        img {
          @include wh(16px, 16px);
          margin-right: 20px;
        }
      }
      .modify-pas-dialog-form {
        @include wh(508px, auto);
        margin: 0 auto;
        div {
          @include wh(508px, 57px);
          #{$attr}: 1px solid #cad3df;
          margin-top: 12px;
          position: relative;
          @include fj();
          align-items: center;
          #{$attr}-radius: 4px;
        }
        input {
          font-size: 14px;
        }
        img {
          @include wh(18px, 18px);
        }
        img:nth-of-type(1) {
          margin-left: 17px;
        }
        img:nth-of-type(2) {
          margin-right: 25px;
          @include wh(22px, 16px);
        }
        img:nth-of-type(3) {
          position: absolute;
          right: 80px;
          top: 18px;
          cursor: pointer;
        }
        img.clear_btn {
          position: absolute;
          right: 140px;
          top: 18px;
          cursor: pointer;
          @include wh(18px, 18px);
        }
        input {
          @include wh(75%, 100%);
          #{$attr}: 0;
          outline: none;
        }
        .reset_int_style {
          @include wh(88.6%, 100%);
        }
        .reset_int_style_ {
          @include wh(50%, 100%);
        }
        .get-code {
          @include wh(34%, 100%);
          text-align: center;
          #{$l}: 57px;
          @include sc(16px, #cad3df);
          cursor: pointer;
        }
      }
      .modify_btn {
        display: block;
        @include wh(374px, 44px);
        @include sc(14px, #fff);
        margin: 25px auto 0;
        text-align: center;
        #{$l}: 44px;
        background: rgba(3, 15, 189, 1);
        box-shadow: 0px 3px 4px 0px rgba(16, 89, 255, 0.27);
        #{$attr}-radius: 22px;
        outline: none;
      }
    }
  }
  .agreement-wrap {
    @include wh(100%, 100%);
    background: rgba(0, 0, 0, 0.4);
    position: fixed;
    left: 0;
    top: 0;
    z-index: 999;
    @include fj(center);
    align-items: center;
    .agreement-dialog {
      @include wh(800px, 670px);
      background: #fff;
      #{$attr}-radius: 10px;
      overflow: hidden;
      .agreement-dialog-header {
        @include wh(100%, 60px);
        @include fj();
        align-items: center;
        background: rgba(243, 245, 248, 1);
        span {
          margin-left: 20px;
          @include sc(18px, #586878);
        }
        img {
          @include wh(17px, 17px);
          margin-right: 20px;
        }
      }
      .agreement-dialog-body {
        @include wh(94%, 490px);
        margin: 0 auto;
        overflow: scroll;
        .agreement-dialog-tap {
          @include wh(250px, 40px);
          margin: 30px auto 0;
          @include fj();
          align-items: center;
          span {
            @include wh(auto, 30px);
            @include sc(16px, #596878);
            text-align: center;
            #{$l}: 26px;
            cursor: pointer;
          }
          .active {
            @include sc(16px, #333);
            #{$attr}-bottom: 2px solid rgba(0, 109, 255, 1);
          }
          span:nth-of-type(2) {
            @include wh(1px, 19px);
            background: #aab6eb;
          }
        }
        .privacy-agreement,
        .serve-agreement {
          margin-top: 20px;
          @include sc(13px, #333);
        }
      }
      .read_btn {
        display: block;
        @include wh(374px, 44px);
        @include sc(14px, #fff);
        margin: 57px auto 0;
        text-align: center;
        #{$l}: 44px;
        background: rgba(3, 15, 189, 1);
        box-shadow: 0px 3px 4px 0px rgba(16, 89, 255, 0.27);
        #{$attr}-radius: 22px;
        outline: none;
      }
    }
  }
  .feedback-message-wrap {
    @include wh(100%, 100%);
    background: rgba(0, 0, 0, 0.4);
    position: fixed;
    left: 0;
    top: 0;
    z-index: 999;
    @include fj(center);
    align-items: center;
    .feedback-message-wrap-dialog {
      @include wh(800px, 430px);
      background: #fff;
      #{$attr}-radius: 10px;
      overflow: hidden;
      .feedback-message-wrap-dialog-header {
        @include wh(100%, 60px);
        @include fj();
        align-items: center;
        background: rgba(243, 245, 248, 1);
        span {
          margin-left: 20px;
          @include sc(18px, #586878);
        }
        img {
          @include wh(17px, 17px);
          margin-right: 20px;
        }
      }
      .textarea-input {
        @include wh(90%, auto);
        margin: 20px auto 0;
        position: relative;
        .el-span {
          position: absolute;
          right: 20px;
          bottom: 10px;
        }
      }
      button {
        display: block;
        @include wh(374px, 44px);
        @include sc(14px, #fff);
        margin: 30px auto 0;
        text-align: center;
        #{$l}: 44px;
        background: rgba(3, 15, 189, 1);
        box-shadow: 0px 3px 4px 0px rgba(16, 89, 255, 0.27);
        #{$attr}-radius: 22px;
        outline: none;
      }
    }
  }
}
</style>
