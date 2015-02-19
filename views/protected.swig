{% extends 'layout.swig' %}

{% block title %}{% parent %} - Protected area{% endblock %}

{% block content %}
<p>If you can read this, you are in a logged in.</p>
<p>
  <a class="btn btn-lg btn-primary" href="/" role="button">Home</a>
  <a class="btn btn-lg btn-primary" href="/logout" role="button">Logout</a>
</p>
{% endblock %}