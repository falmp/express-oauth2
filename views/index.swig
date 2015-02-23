{% extends 'layout.swig' %}

{% block content %}
<p>This is an Express + Passaport PoC.</p>
<p>
  <a class="btn btn-lg btn-warning" href="/protected" role="button"><span class="glyphicon glyphicon-lock" aria-hidden="true"></span> Protected area</a>
  <a class="btn btn-lg btn-info" href="/profile" role="button"><span class="glyphicon glyphicon-user" aria-hidden="true"></span> Profile</a>
  {% if user %}
    <a class="btn btn-lg btn-danger" href="/auth/logout" role="button"><span class="glyphicon glyphicon-log-out" aria-hidden="true"></span> Logout</a>
  {% else %}
    <a class="btn btn-lg btn-primary" href="/auth/login" role="button"><span class="glyphicon glyphicon-log-in" aria-hidden="true"></span> Login</a>
  {% endif %}
</p>
{% endblock %}