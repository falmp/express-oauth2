{% extends 'layout.swig' %}

{% block content %}
<p>This is an Express + Passaport mock.</p>
<p>
  <a class="btn btn-lg btn-primary" href="/protected" role="button">Protected area</a>
  <a class="btn btn-lg btn-primary" href="/logout" role="button">Logout</a>
</p>
{% endblock %}