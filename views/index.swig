{% extends 'layout.swig' %}

{% block content %}
<p>This is an Express + Passaport mock.</p> {{ error }} {{ success }} {{ info }}
{% if user %}
  <p>Hello, {{ user.name }}.</p>
{% endif %}
<p>
  <a class="btn btn-lg btn-default" href="/protected" role="button">Protected area</a>
  {% if user %}
    <a class="btn btn-lg btn-danger" href="/auth/logout" role="button">Logout</a>
  {% else %}
    <a class="btn btn-lg btn-primary" href="/auth/login" role="button">Login</a>
  {% endif %}
</p>
{% endblock %}