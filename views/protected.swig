{% extends 'layout.swig' %}

{% block title %}{% parent %} - Protected area{% endblock %}

{% block content %}
<p>If you can read this, you are in a logged in.</p>
<p>
  <a class="btn btn-lg btn-default" href="/" role="button"><span class="glyphicon glyphicon-home" aria-hidden="true"></span> Home</a>
  <a class="btn btn-lg btn-info" href="/profile" role="button"><span class="glyphicon glyphicon-user" aria-hidden="true"></span> Profile</a>
  <a class="btn btn-lg btn-danger" href="/auth/logout" role="button"><span class="glyphicon glyphicon-log-out" aria-hidden="true"></span> Logout</a>
</p>
{% endblock %}